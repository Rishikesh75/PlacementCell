"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  saveSubmittedRegistration,
  type RegistrationKind,
} from "@/features/tpo/infrastructure/tpoRequests";

import styles from "../LoginPage.module.css";
import { collegeAuthHref } from "@/features/auth/application/collegeAuthHref";

interface RegisterFormProps {
  selectedRole: string;
  collegeId?: string;
}

const ROLE_TO_KIND: Record<string, RegistrationKind> = {
  Student: "student",
  Teacher: "teacher",
  Alumni: "alumni",
  Company: "company",
};

function todayLabel() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

export default function RegisterForm({
  selectedRole,
  collegeId,
}: RegisterFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [instituteId, setInstituteId] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [company, setCompany] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      role: selectedRole,
      email,
      password,
      ...(selectedRole === "Student"
        ? { fullName, instituteId, branch, year }
        : {}),
      ...(selectedRole === "Teacher" ? { fullName, department } : {}),
      ...(selectedRole === "Alumni" ? { fullName, batch, company } : {}),
      ...(selectedRole === "Company" ? { company, recruiterName } : {}),
    };

    console.log(payload);

    const kind = ROLE_TO_KIND[selectedRole] ?? "student";
    const title =
      selectedRole === "Company" ? company : fullName || recruiterName;
    const detail =
      selectedRole === "Student"
        ? `${branch} · ${year} · institute ID ${instituteId}`
        : selectedRole === "Teacher"
          ? `${department} · faculty registration`
          : selectedRole === "Alumni"
            ? `Class of ${batch} · ${company}`
            : `Recruiter ${recruiterName} · requested portal access`;

    saveSubmittedRegistration({
      id: `reg-live-${Date.now()}`,
      queue: "registrations",
      kind,
      title,
      detail,
      submittedOn: todayLabel(),
      status: "pending",
    });

    router.push(collegeAuthHref("/loginPage", collegeId));
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {selectedRole === "Student" ? (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Ananya Krishnan"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="instituteId">Institute ID / roll number</label>
            <input
              id="instituteId"
              type="text"
              placeholder="e.g. 21CS1042"
              value={instituteId}
              onChange={(event) => setInstituteId(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              placeholder="e.g. Computer Science"
              value={branch}
              onChange={(event) => setBranch(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="text"
              placeholder="e.g. Final year"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              required
            />
          </div>
        </>
      ) : null}

      {selectedRole === "Teacher" ? (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Prof. S. Iyer"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              placeholder="e.g. Dept. of Civil Engineering"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              required
            />
          </div>
        </>
      ) : null}

      {selectedRole === "Alumni" ? (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Meera R."
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="batch">Batch</label>
            <input
              id="batch"
              type="text"
              placeholder="e.g. 2022"
              value={batch}
              onChange={(event) => setBatch(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="company">Current company</label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Razorpay"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
          </div>
        </>
      ) : null}

      {selectedRole === "Company" ? (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="company">Company name</label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Razorpay"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="recruiterName">Recruiter name</label>
            <input
              id="recruiterName"
              type="text"
              placeholder="e.g. Riya Shah"
              value={recruiterName}
              onChange={(event) => setRecruiterName(event.target.value)}
              required
            />
          </div>
        </>
      ) : null}

      <div className={styles.inputGroup}>
        <label htmlFor="email">
          {selectedRole === "Company" ? "Work email" : "Institute email"}
        </label>
        <input
          id="email"
          type="email"
          placeholder={
            selectedRole === "Company"
              ? "recruiter@company.com"
              : "yourname@iitchennai.ac.in"
          }
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
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
        />
      </div>

      <button type="submit" className={styles.loginButton}>
        Submit for TPO approval
        <span>→</span>
      </button>
    </form>
  );
}
