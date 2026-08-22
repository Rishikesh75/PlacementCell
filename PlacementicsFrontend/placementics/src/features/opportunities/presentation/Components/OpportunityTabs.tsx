import type { OpportunityKind } from "@/data/opportunities";

import styles from "../OpportunityBoardPage.module.css";

export type OpportunityTab = "all" | OpportunityKind;

interface OpportunityTabsProps {
  active: OpportunityTab;
  allCount: number;
  jobCount: number;
  researchCount: number;
  onChange: (tab: OpportunityTab) => void;
}

export default function OpportunityTabs({
  active,
  allCount,
  jobCount,
  researchCount,
  onChange,
}: OpportunityTabsProps) {
  const tabs: { id: OpportunityTab; label: string }[] = [
    { id: "all", label: `All (${allCount})` },
    { id: "job", label: `Job openings (${jobCount})` },
    { id: "research", label: `Research openings (${researchCount})` },
  ];

  return (
    <div className={styles.tabs} role="tablist" aria-label="Opportunity type">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`${styles.tab} ${active === tab.id ? styles.activeTab : ""}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
