"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";
import { opportunities } from "@/data/opportunities";

import OpportunityTabs, {
  type OpportunityTab,
} from "./Components/OpportunityTabs";
import OpportunityGrid from "./Components/OpportunityGrid";
import styles from "./OpportunityBoardPage.module.css";

const jobCount = opportunities.filter((item) => item.kind === "job").length;
const researchCount = opportunities.filter(
  (item) => item.kind === "research",
).length;

export default function OpportunityBoardPage() {
  const [tab, setTab] = useState<OpportunityTab>("all");

  const items = useMemo(() => {
    if (tab === "all") {
      return opportunities;
    }

    return opportunities.filter((item) => item.kind === tab);
  }, [tab]);

  return (
    <main className={styles.page}>
      <AppHeader active="opportunities" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Opportunities board</h1>
            <p>
              Job and research openings shared directly by teachers and alumni
              of this institute.
            </p>
          </div>

          <Link href="/JobOpporunitesFormPage" className={styles.addButton}>
            + Post an opportunity
          </Link>
        </section>

        <OpportunityTabs
          active={tab}
          allCount={opportunities.length}
          jobCount={jobCount}
          researchCount={researchCount}
          onChange={setTab}
        />

        <OpportunityGrid items={items} />
      </div>
    </main>
  );
}
