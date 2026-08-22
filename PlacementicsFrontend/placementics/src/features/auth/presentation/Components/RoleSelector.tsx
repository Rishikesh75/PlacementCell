"use client";

import styles from "../LoginPage.module.css";

export const LOGIN_ROLES = [
  "Student",
  "Teacher",
  "Alumni",
  "TPOAdmin",
  "Company",
] as const;

export const REGISTER_ROLES = [
  "Student",
  "Teacher",
  "Alumni",
  "Company",
] as const;

interface RoleSelectorProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
  roles?: readonly string[];
}

export default function RoleSelector({
  selectedRole,
  onSelectRole,
  roles = LOGIN_ROLES,
}: RoleSelectorProps) {
  return (
    <div className={styles.roleSelector}>
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onSelectRole(role)}
          className={`${styles.roleButton} ${
            selectedRole === role ? styles.activeRole : ""
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}
