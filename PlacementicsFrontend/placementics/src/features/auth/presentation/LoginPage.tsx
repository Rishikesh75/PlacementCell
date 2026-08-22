import InstitutePanel from "./Components/InstitutePanel";
import LoginPanel from "./Components/LoginPanel";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <InstitutePanel />
      <LoginPanel />
    </main>
  );
}