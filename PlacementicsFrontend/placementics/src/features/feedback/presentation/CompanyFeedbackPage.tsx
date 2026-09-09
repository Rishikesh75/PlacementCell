"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";
import {
  companyFeedback,
  type FeedbackBranch,
} from "@/features/feedback/infrastructure/companyFeedbackData";

import FilterPills from "./Components/FilterPills";
import CompanyFeedbackList from "./Components/CompanyFeedbackList";
import styles from "./CompanyFeedbackPage.module.css";

const YEARS = ["2025–26", "2024–25", "All years"];
const BRANCHES: FeedbackBranch[] = [
  "Computer Science",
  "Electronics",
  "Mechanical",
];

export default function CompanyFeedbackPage() {
  const [selectedYear, setSelectedYear] = useState("2025–26");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const items = useMemo(() => {
    return companyFeedback.filter((item) => {
      const yearMatch =
        selectedYear === "All years" || item.year === selectedYear;
      const branchMatch =
        selectedBranch === null || item.branch === selectedBranch;

      return yearMatch && branchMatch;
    });
  }, [selectedYear, selectedBranch]);

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

        <CompanyFeedbackList items={items} />
      </div>
    </main>
  );
}
