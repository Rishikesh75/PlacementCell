import {
  seasonStats,
} from "@/data/dashboard";

import styles from "../DashboardPage.module.css";

export default function SeasonStats() {
  return (
    <section className={styles.stats} aria-label="Season summary">
      {seasonStats.map((stat) => (
        <article key={stat.id} className={styles.stat}>
          <strong className={styles.statValue}>{stat.value}</strong>
          <span className={styles.statLabel}>{stat.label}</span>
          <span
            className={
              stat.trend === "up" ? styles.statNoteUp : styles.statNote
            }
          >
            {stat.note}
          </span>
        </article>
      ))}
    </section>
  );
}
