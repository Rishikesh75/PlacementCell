"use client";

import { useEffect, useState } from "react";

import InstitutePanel from "./Components/InstitutePanel";
import LoginPanel from "./Components/LoginPanel";
import styles from "./LoginPage.module.css";
import {
  fetchCollegeById,
  type College,
} from "@/shared/institutes/collegesApi";

interface LoginPageProps {
  collegeId?: string;
}

export default function LoginPage({ collegeId }: LoginPageProps) {
  const [college, setCollege] = useState<College | null>(null);

  useEffect(() => {
    if (!collegeId) {
      setCollege(null);
      return;
    }

    const id = collegeId;
    let cancelled = false;

    async function load() {
      try {
        const item = await fetchCollegeById(id);
        if (!cancelled) {
          setCollege(item);
        }
      } catch {
        if (!cancelled) {
          setCollege(null);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  return (
    <main className={styles.loginPage}>
      <InstitutePanel college={college} />
      <LoginPanel collegeId={collegeId} />
    </main>
  );
}
