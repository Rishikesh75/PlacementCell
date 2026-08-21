"use client";

import { useState } from "react";
import styles from "../LoginPage.module.css";

const roles = [
  "Student",
  "Teacher",
  "Alumni",
  "TPO Admin",
  "Company",
];

export default function RoleSelector() {

  const [selectedRole, setSelectedRole] = useState("Student");

  return (
    <div className={styles.roleSelector}>

      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => setSelectedRole(role)}
          className={`${styles.roleButton} ${
            selectedRole === role
              ? styles.activeRole
              : ""
          }`}
        >
          {role}
        </button>
      ))}

    </div>
  );
}