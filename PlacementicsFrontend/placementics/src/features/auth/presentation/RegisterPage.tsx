import InstitutePanel from "./Components/InstitutePanel";
import RegisterPanel from "./Components/RegisterPanel";
import styles from "./LoginPage.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.loginPage}>
      <InstitutePanel />
      <RegisterPanel />
    </main>
  );
}
