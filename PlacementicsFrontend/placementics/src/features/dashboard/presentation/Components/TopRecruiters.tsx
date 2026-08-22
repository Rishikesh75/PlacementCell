import type { RecruiterStat } from "@/data/dashboard";

import styles from "../DashboardPage.module.css";

interface TopRecruitersProps {
  recruiters: RecruiterStat[];
  heading?: string;
}

export default function TopRecruiters({
  recruiters,
  heading = "Top recruiters this season",
}: TopRecruitersProps) {
  return (
    <section className={styles.section} aria-labelledby="recruiters-heading">
      <h2 id="recruiters-heading" className={styles.sectionTitle}>
        {heading}
      </h2>

      <ul className={styles.recruiterList}>
        {recruiters.map((recruiter) => (
          <li key={recruiter.id} className={styles.recruiterRow}>
            <span>{recruiter.name}</span>
            <strong>{recruiter.packageAvg}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
