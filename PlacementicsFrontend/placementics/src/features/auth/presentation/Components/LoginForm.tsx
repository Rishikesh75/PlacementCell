"use client";

import { FormEvent, useState } from "react";
import styles from "../LoginPage.module.css";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      email,
      password,
    });

    // Later:
    // loginUseCase.execute(...)
  }

  return (
    <form
      className={styles.loginForm}
      onSubmit={handleSubmit}
    >

      <div className={styles.inputGroup}>

        <label htmlFor="email">
          Institute Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="yourname@iitchennai.ac.in"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

      </div>

      <div className={styles.inputGroup}>

        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

      </div>

      <button
        type="submit"
        className={styles.loginButton}
      >
        Continue to dashboard
        <span>→</span>
      </button>

    </form>
  );
}