"use client";

import Link from "next/link";
import styles from "../LoginPage.module.css";
import { collegeAuthHref } from "@/shared/institutes/collegesApi";

interface RegisterLinkProps {
  collegeId?: string;
}

export default function RegisterLink({ collegeId }: RegisterLinkProps) {
  return (
    <p className={styles.registerText}>
      New here? Verification uses your institute ID —{" "}
      <Link href={collegeAuthHref("/register", collegeId)}>
        register
      </Link>.
    </p>
  );
}
