"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { setCurrentRole } from "@/shared/auth/session";

import styles from "../LoginPage.module.css";

interface LoginFormProps {
  selectedRole: string;
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

export default function LoginForm({ selectedRole }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const currentRoleConfig = roleConfig[selectedRole] ;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const targetRoute = currentRoleConfig.route;

    setCurrentRole(selectedRole);

    console.log({
      role: selectedRole,
      email,
      password,
    });

    router.push(targetRoute);
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
        />
      </div>
      
      
      <button type="submit" className={styles.loginButton}>
        {currentRoleConfig.buttonText}
        <span>→</span>
      </button>
    </form>
  );
}