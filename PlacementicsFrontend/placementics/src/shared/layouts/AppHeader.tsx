"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";

import { getCurrentRole, type UserRole } from "@/features/auth/application/session";
import { subscribeNever } from "@/shared/lib/useClientSnapshot";

import styles from "./AppHeader.module.css";

export type AppHeaderActive =
  | "dashboard"
  | "requests"
  | "publishSlots"
  | "booking"
  | "feedback"
  | "opportunities"
  | "alumni";

interface AppHeaderProps {
  active?: AppHeaderActive;
}

const navItems: {
  id: AppHeaderActive;
  label: string;
  href: string;
  roles: UserRole[];
}[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashBoardPage",
    roles: ["TPOAdmin", "Company"],
  },
  {
    id: "requests",
    label: "Requests",
    href: "/tpoRequestsPage",
    roles: ["TPOAdmin"],
  },
  {
    id: "publishSlots",
    label: "Publish slots",
    href: "/tpoPublishSlotsPage",
    roles: ["TPOAdmin"],
  },
  {
    id: "booking",
    label: "Book slots",
    href: "/interviewSlotBookingPage",
    roles: ["Company"],
  },
  {
    id: "feedback",
    label: "Company Feedback",
    href: "/feedbackOnCompanyInterviewPage",
    roles: ["Student", "Teacher", "Alumni", "TPOAdmin"],
  },
  {
    id: "opportunities",
    label: "Opportunities",
    href: "/JobopportunitiesBoardPage",
    roles: ["Student", "Teacher", "Alumni", "TPOAdmin"],
  },
];

const ROLE_CHIPS: Record<UserRole, string> = {
  Student: "STUDENT · FINAL YR",
  Teacher: "TEACHER",
  Alumni: "ALUMNI",
  TPOAdmin: "TPO ADMIN",
  Company: "COMPANY",
};

const ROLE_AVATARS: Record<UserRole, string> = {
  Student: "AK",
  Teacher: "TR",
  Alumni: "AL",
  TPOAdmin: "TA",
  Company: "CO",
};

export default function AppHeader({ active }: AppHeaderProps) {
  const role = useSyncExternalStore(
    subscribeNever,
    getCurrentRole,
    getCurrentRole,
  );

  const visibleItems = useMemo(
    () => navItems.filter((item) => item.roles.includes(role)),
    [role],
  );

  return (
    <header className={styles.header}>
      <Link href="/homePage" className={styles.brand}>
        <div className={styles.logo}>P</div>
        <div className={styles.brandText}>
          Placementics | IIT CHENNAI · PLACEMENT CELL
        </div>
      </Link>

      <nav className={styles.nav}>
        {visibleItems.map((item) => (
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
        <span className={styles.roleChip}>{ROLE_CHIPS[role]}</span>
        <span className={styles.avatar}>{ROLE_AVATARS[role]}</span>
      </div>
    </header>
  );
}
