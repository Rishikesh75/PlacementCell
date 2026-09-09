import Link from "next/link";

import { openRightNow } from "@/features/dashboard/infrastructure/dashboardData";

import styles from "../DashboardPage.module.css";

export default function OpenNow() {
  return (
    <section className={styles.section} aria-labelledby="open-heading">
      <h2 id="open-heading" className={styles.sectionTitle}>
        Open right now
      </h2>

      <ul className={styles.openList}>
        {openRightNow.map((item) => (
          <li key={item.id} className={styles.openRow}>
            <span>{item.label}</span>
            <Link href={item.href}>{item.value}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
