"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "@/features/auth/application/session";
import {
    approveFeedback,
    getPendingFeedback,
    rejectRecord,
    type FeedbackRecord,
} from "@/features/tpo/infrastructure/moderationApi";
import AppHeader from "@/shared/layouts/AppHeader";

import styles from "@/features/tpo/presentation/RequestsPage.module.css";

export default function Page() {
    const [items, setItems] = useState<FeedbackRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const collegeId = getCurrentUser()?.collegeId;
        if (!collegeId) {
            Promise.resolve().then(() => {
                setError("Could not identify the TPO institute.");
                setLoading(false);
            });
            return;
        }

        getPendingFeedback(collegeId)
            .then(setItems)
            .catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load feedback."))
            .finally(() => setLoading(false));
    }, []);

    async function decide(id: string, approved: boolean) {
        try {
            if (approved) {
                await approveFeedback(id);
            } else {
                await rejectRecord("/api/interview-feedback", id);
            }
            setItems((current) => current.filter((item) => item.id !== id));
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not update feedback.");
        }
    }

    return (
        <main className={styles.page}>
            <AppHeader active="requests" />
            <div className={styles.content}>
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1>Feedback to approve</h1>
                        <p>Review interview feedback submitted for this institute.</p>
                    </div>
                </section>
                {loading ? <p className={styles.empty}>Loading feedback...</p> : null}
                {error ? <p className={styles.empty}>{error}</p> : null}
                {!loading && !error ? (
                    <section className={styles.list}>
                        {items.length === 0 ? <p className={styles.empty}>No pending feedback.</p> : items.map((item) => (
                            <article className={styles.card} key={item.id}>
                                <div className={styles.cardBody}>
                                    <h2 className={styles.cardTitle}>Interview feedback</h2>
                                    <p className={styles.cardDetail}>Alumni: {item.alumniId} · Company relationship: {item.collegeCompanyId}</p>
                                    <p className={styles.cardMeta}>{item.info.length} interview round{item.info.length === 1 ? "" : "s"}</p>
                                </div>
                                <div className={styles.actions}>
                                    <button className={styles.approveButton} type="button" onClick={() => decide(item.id, true)}>Approve</button>
                                    <button className={styles.rejectButton} type="button" onClick={() => decide(item.id, false)}>Reject</button>
                                </div>
                            </article>
                        ))}
                    </section>
                ) : null}
            </div>
        </main>
    );

}