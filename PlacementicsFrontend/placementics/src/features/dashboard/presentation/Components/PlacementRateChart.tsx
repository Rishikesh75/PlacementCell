import type { PlacementRatePoint } from "@/data/dashboard";

import styles from "../DashboardPage.module.css";

const MAX_RATE = 100;

interface PlacementRateChartProps {
  points: PlacementRatePoint[];
}

export default function PlacementRateChart({ points }: PlacementRateChartProps) {
  return (
    <section className={styles.section} aria-labelledby="rate-heading">
      <h2 id="rate-heading" className={styles.sectionTitle}>
        Placement rate, by year
      </h2>

      <div
        className={styles.chart}
        role="img"
        aria-label="Placement rate by year"
      >
        {points.map((point) => (
          <div key={point.year} className={styles.chartCol}>
            <span className={styles.barValue}>{point.rate}%</span>
            <div className={styles.barTrack}>
              <div
                className={`${styles.bar} ${
                  point.current ? styles.barCurrent : ""
                }`}
                style={{ height: `${(point.rate / MAX_RATE) * 100}%` }}
              />
            </div>
            <span className={styles.barYear}>{point.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
