"use client";

import { useEffect, useState } from "react";

import { getCurrentUser } from "@/features/auth/application/session";
import {
    approveOpportunity,
    getDraftOpportunities,
    rejectRecord,
    type OpportunityRecord,
} from "@/features/tpo/infrastructure/moderationApi";
import AppHeader from "@/shared/layouts/AppHeader";

import styles from "@/features/tpo/presentation/RequestsPage.module.css";

export default function Page() {
    const [items, setItems] = useState<OpportunityRecord[]>([]);
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

        getDraftOpportunities(collegeId)
            .then(setItems)
            .catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load opportunities."))
            .finally(() => setLoading(false));
    }, []);

    async function decide(id: string, approved: boolean) {
        try {
            if (approved) {
                await approveOpportunity(id);
            } else {
                await rejectRecord("/api/placement-opportunities", id);
            }
            setItems((current) => current.filter((item) => item.id !== id));
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not update opportunity.");
        }
    }

    return (
        <main className={styles.page}>
            <AppHeader active="requests" />
            <div className={styles.content}>
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1>Opportunities to approve</h1>
                        <p>Review draft opportunities submitted for this institute.</p>
                    </div>
                </section>
                {loading ? <p className={styles.empty}>Loading opportunities...</p> : null}
                {error ? <p className={styles.empty}>{error}</p> : null}
                {!loading && !error ? (
                    <section className={styles.list}>
                        {items.length === 0 ? <p className={styles.empty}>No draft opportunities.</p> : items.map((item) => (
                            <article className={styles.card} key={item.id}>
                                <div className={styles.cardBody}>
                                    <h2 className={styles.cardTitle}>{item.role}</h2>
                                    <p className={styles.cardDetail}>{item.eligibility ?? "No eligibility details provided."}</p>
                                    <p className={styles.cardMeta}>College-company: {item.collegeCompanyId}{item.deadline ? ` · Deadline ${new Date(item.deadline).toLocaleDateString()}` : ""}</p>
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