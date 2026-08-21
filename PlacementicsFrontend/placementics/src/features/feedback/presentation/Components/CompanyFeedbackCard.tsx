import type { CompanyFeedback } from "@/data/companyFeedback";

import styles from "../CompanyFeedbackPage.module.css";

interface CompanyFeedbackCardProps {
  feedback: CompanyFeedback;
}

function formatPackage(packageLpa: number) {
  return `₹${packageLpa}L`;
}

function renderStars(rating: number) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

export default function CompanyFeedbackCard({
  feedback,
}: CompanyFeedbackCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.initials}>{feedback.initials}</div>

        <div className={styles.info}>
          <h2 className={styles.company}>{feedback.company}</h2>
          <p className={styles.meta}>
            {feedback.role} · Visited {feedback.visitedOn}
          </p>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{feedback.rounds} rounds</span>
            <span className={styles.metricLabel}>Process</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricValue}>
              {formatPackage(feedback.packageLpa)}
            </span>
            <span className={styles.metricLabel}>Package</span>
          </div>

          <div className={styles.metric}>
            <span className={`${styles.metricValue} ${styles.stars}`}>
              {renderStars(feedback.rating)}
            </span>
            <span className={styles.metricLabel}>
              Rated {feedback.rating}★
            </span>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <p className={styles.snippet}>
          {feedback.studentCount} students shared feedback · &ldquo;
          {feedback.snippet}&rdquo;
        </p>
        <a href="#" className={styles.readAll}>
          Read all →
        </a>
      </div>
    </article>
  );
}
