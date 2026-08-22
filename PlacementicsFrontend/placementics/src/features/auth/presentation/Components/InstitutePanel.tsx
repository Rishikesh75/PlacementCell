'use client'
import styles from "../LoginPage.module.css";
import {useRouter} from "next/navigation";
export default function InstitutePanel() {
  const router = useRouter();
  return (
    <section className={styles.institutePanel}>

      <button className={styles.changeInstitute} onClick={() => router.push(`/homePage`)}>
        ←&nbsp; Change institute
      </button>

      <div className={styles.instituteContent}>

        <div className={styles.instituteLogo}>
          <span>I</span>
          <span>T</span>
        </div>

        <h1 className={styles.instituteName}>
          Indian Institute of Technology,
          <br />
          Chennai
        </h1>

        <p className={styles.established}>
          Established in 2001
        </p>

      </div>

      <div className={styles.quoteSection}>

        <div className={styles.quoteLine} />

        <blockquote>
          “Every recruiter visit, every offer, every
          question a student asked in interview—
          logged, so the next batch walks in
          prepared.”
        </blockquote>

        <p className={styles.quoteAuthor}>
          — T. Rangarajan, Training & Placement Officer
        </p>

      </div>

    </section>
  );
}