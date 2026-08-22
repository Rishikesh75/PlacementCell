"use client";

import { useRouter } from "next/navigation";

import AppHeader from "@/shared/layouts/AppHeader";

import CompanyFeedbackForm from "./Components/CompanyFeedbackForm";
import styles from "./CompanyFeedbackFormPage.module.css";

export default function CompanyFeedbackFormPage() {
  const router = useRouter();

  function handleClose() {
    router.push("/feedbackOnCompanyInterviewPage");
  }

  return (
    <main className={styles.page}>
      <AppHeader active="feedback" />

      <div className={styles.backdrop}>
        <section className={styles.modal} aria-labelledby="feedback-form-title">
          <div className={styles.modalHeader}>
            <h1 id="feedback-form-title">Add company feedback</h1>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
              onClick={handleClose}
            >
              ×
            </button>
          </div>

          <CompanyFeedbackForm />
        </section>
      </div>
    </main>
  );
}
