"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";
import type { Opportunity } from "@/features/opportunities/domain/types";
import { getCurrentUser, getServerUserSnapshot } from "@/features/auth/application/session";
import { getApprovedOpportunities } from "@/features/tpo/infrastructure/moderationApi";
import { subscribeNever } from "@/shared/lib/useClientSnapshot";

import OpportunityTabs, {
  type OpportunityTab,
} from "./Components/OpportunityTabs";
import OpportunityGrid from "./Components/OpportunityGrid";
import styles from "./OpportunityBoardPage.module.css";

export default function OpportunityBoardPage() {
  const [tab, setTab] = useState<OpportunityTab>("all");
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = useSyncExternalStore(
    subscribeNever,
    getCurrentUser,
    getServerUserSnapshot,
  );
  const collegeId = currentUser?.collegeId ?? undefined;
  const addOpportunityHref = collegeId
    ? `/${encodeURIComponent(collegeId)}/opportunities/form`
    : "/opportunities/form";

  useEffect(() => {
    const collegeId = getCurrentUser()?.collegeId;
    if (!collegeId) {
      Promise.resolve().then(() => {
        setError("Log in with an institute account to view opportunities.");
        setLoading(false);
      });
      return;
    }

    getApprovedOpportunities(collegeId)
      .then((records) => {
        setOpportunities(records.map((record) => ({
          id: record.id,
          kind: "job",
          title: record.role,
          meta: `College company ${record.collegeCompanyId}`,
          description: record.eligibility ?? "No eligibility details provided.",
          poster: {
            initials: record.alumniId ? "AL" : "TR",
            name: record.alumniId ?? record.teacherId ?? "Institute team",
            caption: record.alumniId ? "Alumni" : "Teacher",
            role: record.alumniId ? "alumni" : "faculty",
          },
          postedAgo: record.deadline
            ? `Deadline ${new Date(record.deadline).toLocaleDateString()}`
            : "Recently approved",
        })));
      })
      .catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load opportunities."))
      .finally(() => setLoading(false));
  }, []);

  const jobCount = opportunities.filter((item) => item.kind === "job").length;
  const researchCount = opportunities.filter((item) => item.kind === "research").length;

  const items = useMemo(() => {
    if (tab === "all") {
      return opportunities;
    }

    return opportunities.filter((item) => item.kind === tab);
  }, [opportunities, tab]);

  return (
    <main className={styles.page}>
      <AppHeader active="opportunities" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Opportunities board</h1>
            <p>
              Job and research openings shared directly by teachers and alumni
              of this institute.
            </p>
          </div>

          <Link href={addOpportunityHref} className={styles.addButton}>
            + Post an opportunity
          </Link>
        </section>

        {!loading && !error ? (
          <>
            <OpportunityTabs
              active={tab}
              allCount={opportunities.length}
              jobCount={jobCount}
              researchCount={researchCount}
              onChange={setTab}
            />
            <OpportunityGrid items={items} />
          </>
        ) : null}
        {loading ? <p className={styles.empty}>Loading approved opportunities...</p> : null}
        {error ? <p className={styles.empty}>{error}</p> : null}
      </div>
    </main>
  );
}
