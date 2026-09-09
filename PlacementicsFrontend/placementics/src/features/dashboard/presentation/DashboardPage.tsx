"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";
import { getCurrentRole } from "@/features/auth/application/session";
import { subscribeNever } from "@/shared/lib/useClientSnapshot";
import {
  CURRENT_YEAR,
  DASHBOARD_YEARS,
  LAST_YEAR,
  placementRateByYear,
  recruitersByYear,
  statsByYear,
  type DashboardYear,
} from "@/features/dashboard/infrastructure/dashboardData";

import SeasonStats from "./Components/SeasonStats";
import PlacementRateChart from "./Components/PlacementRateChart";
import RecentActivity from "./Components/RecentActivity";
import TopRecruiters from "./Components/TopRecruiters";
import OpenNow from "./Components/OpenNow";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const role = useSyncExternalStore(
    subscribeNever,
    getCurrentRole,
    getCurrentRole,
  );
  const [selectedYear, setSelectedYear] = useState<DashboardYear>(CURRENT_YEAR);

  const isCompany = role === "Company";
  const year = isCompany ? LAST_YEAR : selectedYear;

  const stats = statsByYear[year];
  const recruiters = recruitersByYear[year];
  const chartPoints = useMemo(() => {
    if (isCompany) {
      const lastYearPoints = placementRateByYear.filter(
        (point) => point.season === LAST_YEAR,
      );
      return lastYearPoints.slice(-1);
    }

    return placementRateByYear;
  }, [isCompany]);

  return (
    <main className={styles.page}>
      <AppHeader active="dashboard" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>
              {isCompany
                ? `Last placement season ${LAST_YEAR}`
                : `Placement season ${year}`}
            </h1>
            <p>
              {isCompany
                ? "Figures from the previous completed season, shared with visiting companies."
                : "Live figures from the placement cell. Switch years to review past seasons."}
            </p>
          </div>

          <Link href="/homePage" className={styles.switchButton}>
            ← Switch institute
          </Link>
        </section>

        {!isCompany ? (
          <div className={styles.filters} role="tablist" aria-label="Season year">
            {DASHBOARD_YEARS.map((dashboardYear) => (
              <button
                key={dashboardYear}
                type="button"
                role="tab"
                aria-selected={selectedYear === dashboardYear}
                className={`${styles.pill} ${
                  selectedYear === dashboardYear ? styles.activePill : ""
                }`}
                onClick={() => setSelectedYear(dashboardYear)}
              >
                {dashboardYear}
              </button>
            ))}
          </div>
        ) : null}

        <SeasonStats stats={stats} />

        <div className={styles.columns}>
          <div className={styles.mainCol}>
            <PlacementRateChart points={chartPoints} />
            {!isCompany ? <RecentActivity /> : null}
          </div>

          <aside className={styles.sideCol}>
            <TopRecruiters
              recruiters={recruiters}
              heading={
                isCompany
                  ? `Top recruiters ${LAST_YEAR}`
                  : `Top recruiters ${year}`
              }
            />
            {!isCompany ? <OpenNow /> : null}
          </aside>
        </div>
      </div>
    </main>
  );
}
