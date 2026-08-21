import styles from "../InterviewSlotBookingPage.module.css";

interface BookingSummaryFooterProps {
  company: string;
  dateTime: string;
  venue: string;
  reserved: boolean;
}

export default function BookingSummaryFooter({
  company,
  dateTime,
  venue,
  reserved,
}: BookingSummaryFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerItem}>
        <span className={styles.footerLabel}>Company</span>
        <strong>{company}</strong>
      </div>
      <div className={styles.footerItem}>
        <span className={styles.footerLabel}>Date &amp; Time</span>
        <strong>{dateTime}</strong>
      </div>
      <div className={styles.footerItem}>
        <span className={styles.footerLabel}>Venue</span>
        <strong>{venue}</strong>
      </div>
      <div className={`${styles.footerItem} ${styles.footerStatus}`}>
        <span className={styles.footerLabel}>Status</span>
        <strong>
          <span
            className={`${styles.statusDot} ${
              reserved ? styles.statusDotPending : styles.statusDotIdle
            }`}
          />
          {reserved ? "PENDING CELL CONFIRMATION" : "SELECT A SLOT TO RESERVE"}
        </strong>
      </div>
    </footer>
  );
}
