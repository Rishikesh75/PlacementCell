import type { StudentFeedback } from "@/features/feedback/infrastructure/companyFeedbackData";

import StudentFeedbackCard from "./StudentFeedbackCard";
import styles from "../CompanyFeedbackPage.module.css";

interface StudentFeedbackListProps {
  items: StudentFeedback[];
  onSelect: (feedback: StudentFeedback) => void;
}

export default function StudentFeedbackList({
  items,
  onSelect,
}: StudentFeedbackListProps) {
  if (items.length === 0) {
    return (
      <p className={styles.empty}>No student feedback has been shared yet.</p>
    );
  }

  return (
    <section className={styles.list}>
      {items.map((item) => (
        <StudentFeedbackCard
          key={item.id}
          feedback={item}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}
