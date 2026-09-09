"use client";

import InstitutePanel from "./Components/InstitutePanel";
import LoginPanel from "./Components/LoginPanel";
import styles from "./LoginPage.module.css";
import { useCollege } from "@/shared/institutes/useCollege";

interface LoginPageProps {
  collegeId?: string;
}

export default function LoginPage({ collegeId }: LoginPageProps) {
  const college = useCollege(collegeId);

  return (
    <main className={styles.loginPage}>
      <InstitutePanel college={college} />
      <LoginPanel collegeId={collegeId} />
    </main>
  );
}
