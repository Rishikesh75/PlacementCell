import type { Opportunity } from "@/data/opportunities";

import styles from "../OpportunityBoardPage.module.css";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const isJob = opportunity.kind === "job";

  return (
    <article className={styles.card}>
      <span
        className={`${styles.badge} ${
          isJob ? styles.jobBadge : styles.researchBadge
        }`}
      >
        {isJob ? "Job opening" : "Research opening"}
      </span>

      <h2 className={styles.title}>{opportunity.title}</h2>
      <p className={styles.meta}>{opportunity.meta}</p>
      <p className={styles.description}>{opportunity.description}</p>

      <div className={styles.footer}>
        <div className={styles.poster}>
          <span
            className={`${styles.avatar} ${
              opportunity.poster.role === "alumni"
                ? styles.alumniAvatar
                : styles.facultyAvatar
            }`}
          >
            {opportunity.poster.initials}
          </span>
          <div className={styles.posterText}>
            <p className={styles.posterName}>{opportunity.poster.name}</p>
            <p className={styles.posterCaption}>{opportunity.poster.caption}</p>
          </div>
        </div>
        <span className={styles.postedAgo}>Posted {opportunity.postedAgo}</span>
      </div>
    </article>
  );
}
