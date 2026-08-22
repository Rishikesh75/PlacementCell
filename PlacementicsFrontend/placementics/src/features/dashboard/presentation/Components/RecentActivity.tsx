import Link from "next/link";

import { recentActivity } from "@/data/dashboard";

import styles from "../DashboardPage.module.css";

const kindClass = {
  research: styles.dotGold,
  feedback: styles.dotRed,
  alumni: styles.dotGreen,
};

export default function RecentActivity() {
  return (
    <section className={styles.section} aria-labelledby="activity-heading">
      <h2 id="activity-heading" className={styles.sectionTitle}>
        Recent activity
      </h2>

      <ul className={styles.activityList}>
        {recentActivity.map((item) => (
          <li key={item.id} className={styles.activityItem}>
            <span
              className={`${styles.dot} ${kindClass[item.kind]}`}
              aria-hidden="true"
            />
            <Link href={item.href} className={styles.activityText}>
              {item.text}
            </Link>
            <span className={styles.activityTime}>{item.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
