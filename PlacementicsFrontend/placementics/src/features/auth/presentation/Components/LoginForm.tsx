"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { setCurrentUser, type UserRole } from "@/shared/auth/session";
import { LoginError, loginWithEmail } from "@/shared/auth/loginApi";

import styles from "../LoginPage.module.css";

interface LoginFormProps {
  selectedRole: string;
  collegeId?: string;
}

const roleConfig: Record<
  string,
  { route: string; buttonText: string }
> = {
  Student: {
    route: "/feedbackOnCompanyInterviewPage",
    buttonText: "Continue to feedback",
  },
  Teacher: {
    route: "/JobopportunitiesBoardPage",
    buttonText: "Continue to opportunities",
  },
  Alumni: {
    route: "/JobopportunitiesBoardPage",
    buttonText: "Continue to opportunities",
  },
  TPOAdmin: {
    route: "/tpoRequestsPage",
    buttonText: "Continue to requests",
  },
  Company: {
    route: "/dashBoardPage",
    buttonText: "Continue to dashboard",
  },
};

export default function LoginForm({
  selectedRole,
  collegeId,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const currentRoleConfig = roleConfig[selectedRole];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!collegeId) {
      setError("Select an institute before logging in.");
      return;
    }

    if (!currentRoleConfig) {
      setError("Choose a role to continue.");
      return;
    }

    setSubmitting(true);

    try {
      const user = await loginWithEmail({
        role: selectedRole as UserRole,
        email,
        collegeId,
      });

      setCurrentUser(user);
      router.push(currentRoleConfig.route);
    } catch (cause) {
      if (cause instanceof LoginError) {
        setError(cause.message);
      } else {
        setError("Could not log in. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Institute Email</label>

        <input
          id="email"
          type="email"
          placeholder="yourname@iitchennai.ac.in"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="username"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error ? <p className={styles.formError}>{error}</p> : null}

      <button
        type="submit"
        className={styles.loginButton}
        disabled={submitting}
      >
        {submitting ? "Checking account…" : currentRoleConfig?.buttonText ?? "Log in"}
        <span>→</span>
      </button>
    </form>
  );
}
