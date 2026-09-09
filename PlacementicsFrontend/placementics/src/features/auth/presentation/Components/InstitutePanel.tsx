"use client";

import { useRouter } from "next/navigation";

import styles from "../LoginPage.module.css";
import { collegeInitials, type College } from "@/shared/institutes/collegesApi";

interface InstitutePanelProps {
  college: College | null;
}

export default function InstitutePanel({ college }: InstitutePanelProps) {
  const router = useRouter();
  const initials = collegeInitials(college?.name ?? "");

  return (
    <section className={styles.institutePanel}>
      <button
        className={styles.changeInstitute}
        onClick={() => router.push(`/homePage`)}
      >
        ←&nbsp; Change institute
      </button>

      <div className={styles.instituteContent}>
        <div className={styles.instituteLogo}>
          {college?.imageUrl ? (
            // Native img: college logos are hosted on R2, not the Next image optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={college.imageUrl}
              alt=""
              className={styles.instituteLogoImage}
            />
          ) : (
            initials.split("").map((char, index) => (
              <span key={`${char}-${index}`}>{char}</span>
            ))
          )}
        </div>

        <h1 className={styles.instituteName}>
          {college?.name ?? "Select an institute"}
        </h1>

        {college?.address ? (
          <p className={styles.established}>{college.address}</p>
        ) : null}
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
