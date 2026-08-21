import { placementRateByYear } from "@/data/dashboard";

import styles from "../DashboardPage.module.css";

const MAX_RATE = 100;

export default function PlacementRateChart() {
  return (
    <section className={styles.section} aria-labelledby="rate-heading">
      <h2 id="rate-heading" className={styles.sectionTitle}>
        Placement rate, by year
      </h2>

      <div className={styles.chart} role="img" aria-label="Placement rate from 2021 to 2026">
        {placementRateByYear.map((point) => (
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
