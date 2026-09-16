"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";

import {
  getCurrentUser,
  getServerUserSnapshot,
  type UserRole,
} from "@/features/auth/application/session";
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
    href: "/dashboard",
    roles: ["TPOAdmin", "Company"],
  },
  {
    id: "requests",
    label: "Requests",
    href: "/tpo/requests",
    roles: ["TPOAdmin"],
  },
  {
    id: "publishSlots",
    label: "Publish slots",
    href: "/tpo/publish-slots",
    roles: ["TPOAdmin"],
  },
  {
    id: "booking",
    label: "Book slots",
    href: "/booking",
    roles: ["Company"],
  },
  {
    id: "feedback",
    label: "Company Feedback",
    href: "/feedback",
    roles: ["Student", "Teacher", "Alumni"],
  },
  {
    id: "opportunities",
    label: "Opportunities",
    href: "/opportunities",
    roles: ["Student", "Teacher", "Alumni"],
  },
    {
    id: "feedback",
    label: "Company Feedback",
    href: "/tpo/feedback",
    roles: ["TPOAdmin"],
  },
  {
    id: "opportunities",
    label: "Opportunities",
    href: "/tpo/opportunities",
    roles: ["TPOAdmin"],
  },
];

const ROLE_CHIPS: Record<UserRole, string> = {
  Student: "STUDENT",
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

function getCollegeScopedPath(
  pathname: string,
  collegeId?: string | null,
  role?: UserRole,
) {
  if (!collegeId) {
    return pathname;
  }

  const isCollegeScopedRoute =
    pathname === "/feedback" || pathname === "/opportunities";
  const isCollegeMemberRole =
    role === "Student" || role === "Teacher" || role === "Alumni";

  if (!isCollegeScopedRoute || !isCollegeMemberRole) {
    return pathname;
  }

  return `/${encodeURIComponent(collegeId)}${pathname}`;
}

export default function AppHeader({ active }: AppHeaderProps) {
  const user = useSyncExternalStore(
    subscribeNever,
    getCurrentUser,
    getServerUserSnapshot,
  );

  const role = user?.role ?? "Student";
  const collegeId = user?.collegeId;

  const visibleItems = useMemo(
    () =>
      navItems
        .filter((item) => item.roles.includes(role))
        .map((item) => ({
          ...item,
          href: getCollegeScopedPath(item.href, collegeId, role),
        })),
    [collegeId, role],
  );

  return (
    <header className={styles.header}>
      <Link href="/home" className={styles.brand}>
        <div className={styles.logo}>P</div>
        {/* TODO: Here Add the image of the institution here */}
        {/* <div className={styles.brandText}>
          Placementics
        </div> */}
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
