import type { TpoQueue } from "@/features/tpo/infrastructure/tpoRequests";

import styles from "../TpoRequestsPage.module.css";

interface TpoQueueTabsProps {
  active: TpoQueue;
  onChange: (queue: TpoQueue) => void;
}

const TABS: { id: TpoQueue; label: string }[] = [
  { id: "registrations", label: "Registrations" },
  { id: "feedback", label: "Feedback" },
  { id: "opportunities", label: "Opportunities" },
  { id: "slots", label: "Slot bookings" },
];

export default function TpoQueueTabs({ active, onChange }: TpoQueueTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Request queues">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`${styles.tab} ${active === tab.id ? styles.activeTab : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
