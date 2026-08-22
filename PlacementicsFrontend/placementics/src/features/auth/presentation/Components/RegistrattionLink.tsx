import Link from "next/link";
import styles from "../LoginPage.module.css";

export default function RegisterLink() {
  return (
    <p className={styles.registerText}>
      New here? Verification uses your institute ID —{" "}
      <Link href="/register">
        register
      </Link>.
    </p>
  );
}