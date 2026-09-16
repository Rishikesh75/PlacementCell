"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import AppHeader from "@/shared/layouts/AppHeader";

import OpportunityForm from "./Components/OpportunityForm";
import styles from "./OpportunityFormPage.module.css";

import { getCurrentUser } from "@/features/auth/application/session";

export default function OpportunityFormPage() {
  const router = useRouter();

  const handleClose = useCallback(() => {
    const collegeId = getCurrentUser()?.collegeId;
    router.push(collegeId ? `/${encodeURIComponent(collegeId)}/opportunities` : "/opportunities");
  }, [router]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  return (
    <main className={styles.page}>
      <AppHeader active="opportunities" />

      <div className={styles.stage}>
        <section
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="opportunity-form-title"
        >
          <header className={styles.modalHeader}>
            <h1 id="opportunity-form-title" className={styles.title}>
              Post an opportunity
            </h1>
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
          </header>

          <OpportunityForm />
        </section>
      </div>
    </main>
  );
}
