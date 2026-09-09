"use client";

import InstitutePanel from "./Components/InstitutePanel";
import RegisterPanel from "./Components/RegisterPanel";
import styles from "./LoginPage.module.css";
import { useCollege } from "@/features/auth/application/useCollege";

interface RegisterPageProps {
  collegeId?: string;
}

export default function RegisterPage({ collegeId }: RegisterPageProps) {
  const college = useCollege(collegeId);

  return (
    <main className={styles.loginPage}>
      <InstitutePanel college={college} />
      <RegisterPanel collegeId={collegeId} />
    </main>
  );
}
