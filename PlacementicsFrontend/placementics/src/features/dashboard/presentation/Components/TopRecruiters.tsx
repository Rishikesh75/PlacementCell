import { topRecruiters } from "@/data/dashboard";

import styles from "../DashboardPage.module.css";

export default function TopRecruiters() {
  return (
    <section className={styles.section} aria-labelledby="recruiters-heading">
      <h2 id="recruiters-heading" className={styles.sectionTitle}>
        Top recruiters this season
      </h2>

      <ul className={styles.recruiterList}>
        {topRecruiters.map((recruiter) => (
          <li key={recruiter.id} className={styles.recruiterRow}>
            <span>{recruiter.name}</span>
            <strong>{recruiter.packageAvg}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
