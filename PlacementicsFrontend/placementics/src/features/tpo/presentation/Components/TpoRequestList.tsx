import type { RequestStatus, TpoRequest } from "@/data/tpoRequests";

import styles from "../TpoRequestsPage.module.css";

interface TpoRequestListProps {
  items: TpoRequest[];
  onDecide: (id: string, status: Exclude<RequestStatus, "pending">) => void;
}

const STATUS_LABEL: Record<RequestStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export default function TpoRequestList({ items, onDecide }: TpoRequestListProps) {
  if (items.length === 0) {
    return <p className={styles.empty}>No requests in this queue.</p>;
  }

  return (
    <section className={styles.list}>
      {items.map((item) => (
        <article key={item.id} className={styles.card}>
          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>{item.title}</h2>
            <p className={styles.cardDetail}>{item.detail}</p>
            <p className={styles.cardMeta}>Submitted {item.submittedOn}</p>
          </div>

          {item.status === "pending" ? (
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.approveButton}
                onClick={() => onDecide(item.id, "approved")}
              >
                Approve
              </button>
              <button
                type="button"
                className={styles.rejectButton}
                onClick={() => onDecide(item.id, "rejected")}
              >
                Reject
              </button>
            </div>
          ) : (
            <span
              className={`${styles.statusChip} ${
                item.status === "approved"
                  ? styles.statusApproved
                  : styles.statusRejected
              }`}
            >
              {STATUS_LABEL[item.status]}
            </span>
          )}
        </article>
      ))}
    </section>
  );
}
