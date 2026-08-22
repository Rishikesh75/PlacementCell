import type { CompanyFeedback } from "@/data/companyFeedback";

import CompanyFeedbackCard from "./CompanyFeedbackCard";
import styles from "../CompanyFeedbackPage.module.css";

interface CompanyFeedbackListProps {
  items: CompanyFeedback[];
}

export default function CompanyFeedbackList({
  items,
}: CompanyFeedbackListProps) {
  if (items.length === 0) {
    return (
      <p className={styles.empty}>
        No company feedback matches the selected filters.
      </p>
    );
  }

  return (
    <section className={styles.list}>
      {items.map((item) => (
        <CompanyFeedbackCard key={item.id} feedback={item} />
      ))}
    </section>
  );
}
