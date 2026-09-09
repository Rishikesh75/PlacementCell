import type { Opportunity } from "@/features/opportunities/infrastructure/opportunitiesData";

import OpportunityCard from "./OpportunityCard";
import styles from "../OpportunityBoardPage.module.css";

interface OpportunityGridProps {
  items: Opportunity[];
}

export default function OpportunityGrid({ items }: OpportunityGridProps) {
  if (items.length === 0) {
    return (
      <p className={styles.empty}>
        No openings match the selected filter.
      </p>
    );
  }

  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <OpportunityCard key={item.id} opportunity={item} />
      ))}
    </section>
  );
}
