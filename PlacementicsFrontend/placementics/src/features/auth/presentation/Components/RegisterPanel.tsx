"use client";

import { useState } from "react";
import Link from "next/link";

import RoleSelector, { REGISTER_ROLES } from "./RoleSelector";
import RegisterForm from "./RegisterForm";
import styles from "../LoginPage.module.css";
import { collegeAuthHref } from "@/features/auth/application/collegeAuthHref";

interface RegisterPanelProps {
  collegeId?: string;
}

export default function RegisterPanel({ collegeId }: RegisterPanelProps) {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  if (registrationSubmitted) {
    return (
      <section className={styles.loginPanel}>
        <div className={`${styles.loginContainer} ${styles.registerContainer}`}>
          <div className={styles.loginHeader}>
            <h2>Registration submitted</h2>
            <p>Your account is waiting for TPO approval.</p>
          </div>

          <div className={styles.registrationSuccess}>
            The TPO will review your request. You can log in after your account
            has been approved.
          </div>

          <Link
            className={styles.loginButton}
            href={collegeAuthHref("/login", collegeId)}
          >
            Go to login
            <span>→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.loginPanel}>
      <div className={`${styles.loginContainer} ${styles.registerContainer}`}>
        <div className={styles.loginHeader}>
          <h2>Register</h2>
          <p>Create an account for this institute. TPO reviews every request.</p>
        </div>

        <RoleSelector
          roles={REGISTER_ROLES}
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
        />

        <p className={styles.tpoNote}>
          TPO accounts are created when the institute is set up — there is no
          TPO registration here.
        </p>

        <RegisterForm
          selectedRole={selectedRole}
          collegeId={collegeId}
          onSubmitted={() => setRegistrationSubmitted(true)}
        />

        <p className={styles.registerText}>
          Already have an account?{" "}
          <Link href={collegeAuthHref("/login", collegeId)}>Log in</Link>.
        </p>
      </div>
    </section>
  );
}
