import type { StudentFeedback } from "@/data/companyFeedback";

import styles from "../CompanyFeedbackPage.module.css";

interface StudentFeedbackCardProps {
  feedback: StudentFeedback;
  onSelect: (feedback: StudentFeedback) => void;
}

function renderStars(rating: number) {
  return "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);
}

function snippetFrom(feedback: StudentFeedback) {
  return (
    feedback.roundDetails[0]?.questions[0] ??
    feedback.roundDetails[0]?.heading ??
    "No questions recorded."
  );
}

export default function StudentFeedbackCard({
  feedback,
  onSelect,
}: StudentFeedbackCardProps) {
  return (
    <button
      type="button"
      className={styles.studentCard}
      onClick={() => onSelect(feedback)}
    >
      <div className={styles.studentCardTop}>
        <div>
          <h2 className={styles.studentLabel}>{feedback.studentLabel}</h2>
          <p className={styles.studentMeta}>Submitted {feedback.submittedOn}</p>
        </div>
        <div className={styles.studentRating}>
          <span className={styles.stars}>{renderStars(feedback.rating)}</span>
          <span className={styles.metricLabel}>Rated {feedback.rating}★</span>
        </div>
      </div>
      <p className={styles.snippet}>&ldquo;{snippetFrom(feedback)}&rdquo;</p>
    </button>
  );
}
