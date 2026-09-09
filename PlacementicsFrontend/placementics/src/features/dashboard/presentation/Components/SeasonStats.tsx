import type { SeasonStat } from "@/features/dashboard/infrastructure/dashboardData";

import styles from "../DashboardPage.module.css";

interface SeasonStatsProps {
  stats: SeasonStat[];
}

export default function SeasonStats({ stats }: SeasonStatsProps) {
  return (
    <section className={styles.stats} aria-label="Season summary">
      {stats.map((stat) => (
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
