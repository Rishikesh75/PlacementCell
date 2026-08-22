"use client";

import { useState } from "react";
import RoleSelector from "./RoleSelector";
import LoginForm from "./LoginForm";
import RegisterLink from "./RegistrattionLink";
import styles from "../LoginPage.module.css";

export default function LoginPanel() {
  const [selectedRole, setSelectedRole] = useState("Student");

  return (
    <section className={styles.loginPanel}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h2>Log in</h2>

          <p>
            Choose how you&apos;re connected to the institute.
          </p>
        </div>

        <RoleSelector
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
        />

        <LoginForm selectedRole={selectedRole} />

        <RegisterLink />
      </div>
    </section>
  );
}