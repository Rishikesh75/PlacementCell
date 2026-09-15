"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";
import type { CompanyFeedback, FeedbackBranch } from "@/features/feedback/domain/types";
import { getCurrentUser } from "@/features/auth/application/session";
import { getApprovedFeedback } from "@/features/tpo/infrastructure/moderationApi";

import FilterPills from "./Components/FilterPills";
import CompanyFeedbackList from "./Components/CompanyFeedbackList";
import styles from "./FeedbackOverviewPage.module.css";

const YEARS = ["2025–26", "2024–25", "All years"];
const BRANCHES: FeedbackBranch[] = [
  "Computer Science",
  "Electronics",
  "Mechanical",
];

export default function CompanyFeedbackPage() {
  const [selectedYear, setSelectedYear] = useState("2025–26");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [companyFeedback, setCompanyFeedback] = useState<CompanyFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collegeId = getCurrentUser()?.collegeId;
    if (!collegeId) {
      Promise.resolve().then(() => {
        setError("Log in with an institute account to view feedback.");
        setLoading(false);
      });
      return;
    }

    getApprovedFeedback(collegeId)
      .then((records) => {
        setCompanyFeedback(records.map((record) => ({
          id: record.id,
          initials: "FB",
          company: record.collegeCompanyId,
          role: "Interview feedback",
          visitedOn: "Approved",
          year: "2025–26",
          branch: "Computer Science",
          rounds: record.info.length,
          packageLpa: 0,
          rating: 0,
          studentCount: 1,
          snippet: `Submitted by alumni ${record.alumniId}`,
        })));
      })
      .catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load feedback."))
      .finally(() => setLoading(false));
  }, []);

  const items = useMemo(() => {
    return companyFeedback.filter((item) => {
      const yearMatch =
        selectedYear === "All years" || item.year === selectedYear;
      const branchMatch =
        selectedBranch === null || item.branch === selectedBranch;

      return yearMatch && branchMatch;
    });
  }, [companyFeedback, selectedYear, selectedBranch]);

  function handleBranchChange(branch: string) {
    setSelectedBranch((current) => (current === branch ? null : branch));
  }

  return (
    <main className={styles.page}>
      <AppHeader active="feedback" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Company feedback</h1>
            <p>
              What students who sat for each drive actually experienced —
              rounds, questions, and how it felt.
            </p>
          </div>

          <Link
            href="/feedBackOnCompanyInterviewFormPage"
            className={styles.addButton}
          >
            + Add feedback
          </Link>
        </section>

        <FilterPills
          years={YEARS}
          branches={BRANCHES}
          selectedYear={selectedYear}
          selectedBranch={selectedBranch}
          onYearChange={setSelectedYear}
          onBranchChange={handleBranchChange}
        />

        {loading ? <p className={styles.empty}>Loading approved feedback...</p> : null}
        {error ? <p className={styles.empty}>{error}</p> : null}
        {!loading && !error ? <CompanyFeedbackList items={items} /> : null}
      </div>
    </main>
  );
}
