"use client";

import { useState } from "react";
import Link from "next/link";

import RoleSelector, { REGISTER_ROLES } from "./RoleSelector";
import RegisterForm from "./RegisterForm";
import styles from "../LoginPage.module.css";

export default function RegisterPanel() {
  const [selectedRole, setSelectedRole] = useState("Student");

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

        <RegisterForm selectedRole={selectedRole} />

        <p className={styles.registerText}>
          Already have an account?{" "}
          <Link href="/loginPage">Log in</Link>.
        </p>
      </div>
    </section>
  );
}
