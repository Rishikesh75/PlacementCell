import Link from "next/link";

import styles from "./AppHeader.module.css";

export type AppHeaderActive =
  | "dashboard"
  | "feedback"
  | "opportunities"
  | "alumni";

interface AppHeaderProps {
  active?: AppHeaderActive;
}

const navItems: { id: AppHeaderActive; label: string; href: string }[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashBoardPage" },
  {
    id: "feedback",
    label: "Company Feedback",
    href: "/feedbackOnCompanyInterviewPage",
  },
  {
    id: "opportunities",
    label: "Opportunities",
    href: "/JobopportunitiesBoardPage",
  },
  { id: "alumni", label: "Alumni Directory", href: "#" },
];

export default function AppHeader({ active }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/homePage" className={styles.brand}>
        <div className={styles.logo}>P</div>
        <div className={styles.brandText}>
          Placementics | IIT CHENNAI · PLACEMENT CELL
        </div>
      </Link>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.navLink} ${
              active === item.id ? styles.active : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.user}>
        <span className={styles.roleChip}>STUDENT · FINAL YR</span>
        <span className={styles.avatar}>AK</span>
      </div>
    </header>
  );
}
