import type { RegistrationKind } from "@/features/tpo/infrastructure/tpoRequests";

import styles from "../TpoRequestsPage.module.css";

interface TpoRegistrationTabsProps {
  active: RegistrationKind;
  onChange: (kind: RegistrationKind) => void;
}

const TABS: { id: RegistrationKind; label: string }[] = [
  { id: "company", label: "Company registers" },
  { id: "student", label: "Student registers" },
  { id: "teacher", label: "Teacher registers" },
  { id: "alumni", label: "Alumni registers" },
  { id: "tpoCompany", label: "TPO Admin company" },
];

export default function TpoRegistrationTabs({
  active,
  onChange,
}: TpoRegistrationTabsProps) {
  return (
    <div className={styles.filters} role="tablist" aria-label="Registration type">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`${styles.pill} ${active === tab.id ? styles.activePill : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
