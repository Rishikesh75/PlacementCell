"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";
import {
  getCompanyFeedback,
  getStudentFeedbacks,
  type StudentFeedback,
} from "@/features/feedback/infrastructure/companyFeedbackData";

import StudentFeedbackList from "./Components/StudentFeedbackList";
import StudentFeedbackOverlay from "./Components/StudentFeedbackOverlay";
import styles from "./CompanyFeedbackPage.module.css";

interface CompanyStudentFeedbacksPageProps {
  companyId: string;
}

export default function CompanyStudentFeedbacksPage({
  companyId,
}: CompanyStudentFeedbacksPageProps) {
  const [selectedFeedback, setSelectedFeedback] =
    useState<StudentFeedback | null>(null);

  const handleCloseOverlay = useCallback(() => {
    setSelectedFeedback(null);
  }, []);

  const company = useMemo(() => {
    const parsed = Number.parseInt(companyId, 10);
    if (!Number.isFinite(parsed)) {
      return undefined;
    }
    return getCompanyFeedback(parsed);
  }, [companyId]);

  const entries = useMemo(() => {
    if (!company) {
      return [];
    }
    return getStudentFeedbacks(company.id);
  }, [company]);

  return (
    <main className={styles.page}>
      <AppHeader active="feedback" />

      <div className={styles.content}>
        <p className={styles.backRow}>
          <Link href="/feedbackOnCompanyInterviewPage" className={styles.backLink}>
            ← All companies
          </Link>
        </p>

        {company ? (
          <>
            <section className={styles.hero}>
              <div className={styles.heroText}>
                <h1>{company.company}</h1>
                <p>
                  {company.role} · Visited {company.visitedOn}. Open a
                  submission to see rounds and questions.
                </p>
              </div>
            </section>

            <StudentFeedbackList
              items={entries}
              onSelect={setSelectedFeedback}
            />
          </>
        ) : (
          <section className={styles.hero}>
            <div className={styles.heroText}>
              <h1>Company not found</h1>
              <p>This feedback page does not match a known campus drive.</p>
            </div>
          </section>
        )}
      </div>

      {company && selectedFeedback ? (
        <StudentFeedbackOverlay
          company={company}
          feedback={selectedFeedback}
          onClose={handleCloseOverlay}
        />
      ) : null}
    </main>
  );
}
