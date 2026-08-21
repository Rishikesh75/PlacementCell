import Link from "next/link";

import AppHeader from "@/shared/layouts/AppHeader";

import SeasonStats from "./Components/SeasonStats";
import PlacementRateChart from "./Components/PlacementRateChart";
import RecentActivity from "./Components/RecentActivity";
import TopRecruiters from "./Components/TopRecruiters";
import OpenNow from "./Components/OpenNow";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <AppHeader active="dashboard" />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Placement season 2025–26</h1>
            <p>Live figures from the placement cell, updated after every drive.</p>
          </div>

          <Link href="/homePage" className={styles.switchButton}>
            ← Switch institute
          </Link>
        </section>

        <SeasonStats />

        <div className={styles.columns}>
          <div className={styles.mainCol}>
            <PlacementRateChart />
            <RecentActivity />
          </div>

          <aside className={styles.sideCol}>
            <TopRecruiters />
            <OpenNow />
          </aside>
        </div>
      </div>
    </main>
  );
}
