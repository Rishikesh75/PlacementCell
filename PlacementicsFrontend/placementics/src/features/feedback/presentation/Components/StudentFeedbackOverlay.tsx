"use client";

import { useEffect } from "react";

import type { CompanyFeedback, StudentFeedback } from "@/features/feedback/infrastructure/companyFeedbackData";

import styles from "../CompanyFeedbackPage.module.css";

interface StudentFeedbackOverlayProps {
  company: CompanyFeedback;
  feedback: StudentFeedback;
  onClose: () => void;
}

function renderStars(rating: number) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

export default function StudentFeedbackOverlay({
  company,
  feedback,
  onClose,
}: StudentFeedbackOverlayProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlayBackdrop}
      onClick={onClose}
      role="presentation"
    >
      <section
        className={styles.overlayModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-feedback-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.overlayHeader}>
          <div>
            <h2 id="student-feedback-title" className={styles.overlayTitle}>
              {company.company}
            </h2>
            <p className={styles.overlayMeta}>
              {feedback.studentLabel} · Submitted {feedback.submittedOn}
            </p>
            <p className={`${styles.overlayMeta} ${styles.stars}`}>
              {renderStars(feedback.rating)} · Rated {feedback.rating}★
            </p>
          </div>
          <button
            type="button"
            className={styles.overlayClose}
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.overlayRounds}>
          {feedback.roundDetails.map((round, index) => (
            <article key={`${round.heading}-${index}`} className={styles.roundBlock}>
              <h3 className={styles.roundHeading}>
                Round {index + 1} · {round.heading}
              </h3>
              {round.questions.length > 0 ? (
                <ul className={styles.questionList}>
                  {round.questions.map((question, questionIndex) => (
                    <li key={questionIndex}>{question}</li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyRound}>No questions recorded.</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
