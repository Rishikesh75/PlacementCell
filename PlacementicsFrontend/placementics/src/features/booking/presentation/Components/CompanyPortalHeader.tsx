import Link from "next/link";

import styles from "../InterviewSlotBookingPage.module.css";

export default function CompanyPortalHeader() {
  return (
    <header className={styles.header}>
      <Link href="/homePage" className={styles.brand}>
        <div className={styles.logo}>P</div>
        <div className={styles.brandCopy}>
          <span className={styles.brandName}>Placementics</span>
          <span className={styles.brandDivider}>|</span>
          <span className={styles.brandMeta}>
            IIT CHENNAI · COMPANY PORTAL
          </span>
        </div>
      </Link>

      <div className={styles.headerActions}>
        <Link href="/loginPage" className={styles.registerLink}>
          REGISTER
        </Link>
        <span className={styles.avatar} aria-label="Signed in as RZ">
          RZ
        </span>
      </div>
    </header>
  );
}
