"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import FieldInput from "@/presentation/components/forms/FieldInput";
import PageShell from "@/presentation/components/ui/PageShell";

type UserRole = "student" | "teacher" | "alumni" | "company";
type CompanyAuthMode = "login" | "signup";

type RoleConfig = {
  id: UserRole;
  label: string;
  subtitle: string;
  icon: ReactNode;
};

function StudentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 8l10-4 10 4-10 4L2 8z" />
      <path d="M6 10v4c0 1 3 3 6 3s6-2 6-3v-4" />
    </svg>
  );
}

function TeacherIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="14" height="12" rx="2" />
      <path d="M7 9h6M7 12h4" />
      <path d="M18 15l2 2 3-3" />
    </svg>
  );
}

function AlumniIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M3 18c0-2.5 2.2-4 5-4s5 1.5 5 4" />
      <path d="M11 18c.4-1.9 2.2-3 4.5-3 2.8 0 5 1.5 5 4" />
    </svg>
  );
}

function CompanyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="12" height="16" rx="2" />
      <path d="M7 8h4M7 12h4M17 10h4M19 8v4" />
      <path d="M15 20h6v-6" />
    </svg>
  );
}

const roleCards: RoleConfig[] = [
  {
    id: "student",
    label: "Student",
    subtitle: "Student portal access",
    icon: <StudentIcon />,
  },
  {
    id: "teacher",
    label: "Teacher",
    subtitle: "Faculty portal access",
    icon: <TeacherIcon />,
  },
  {
    id: "alumni",
    label: "Alumni",
    subtitle: "Alumni portal access",
    icon: <AlumniIcon />,
  },
  {
    id: "company",
    label: "Company",
    subtitle: "Recruiter login/signup",
    icon: <CompanyIcon />,
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [companyMode, setCompanyMode] = useState<CompanyAuthMode>("login");

  const title = useMemo(() => {
    if (selectedRole !== "company") {
      const roleLabel = roleCards.find((role) => role.id === selectedRole)?.label ?? "User";
      return `${roleLabel} Login`;
    }
    return companyMode === "login" ? "Company Login" : "Company Signup";
  }, [companyMode, selectedRole]);

  const subtitle =
    selectedRole === "company"
      ? companyMode === "login"
        ? "Company representatives can sign in to manage drives and candidates."
        : "Create a company account to post jobs and manage recruitment."
      : "Sign in to continue to the Placementics portal.";

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{subtitle}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {roleCards.map((role) => {
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`rounded-lg border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={isActive ? "text-indigo-600" : "text-slate-500"}>{role.icon}</span>
                  <span>
                    <span className="block text-sm font-semibold">{role.label}</span>
                    <span className="block text-xs text-slate-500">{role.subtitle}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedRole === "company" ? (
          <div className="mt-6 flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setCompanyMode("login")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                companyMode === "login"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Company Login
            </button>
            <button
              type="button"
              onClick={() => setCompanyMode("signup")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                companyMode === "signup"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Company Signup
            </button>
          </div>
        ) : null}

        <form className="mt-6 space-y-4">
          {selectedRole === "company" && companyMode === "signup" ? (
            <FieldInput id="companyName" label="Company Name" placeholder="ABC Technologies Pvt Ltd" />
          ) : null}
          <FieldInput
            id="email"
            label={selectedRole === "company" ? "Company Email" : "Institution Email"}
            type="email"
            placeholder={selectedRole === "company" ? "hr@company.com" : "student@iiitdm.ac.in"}
          />
          <FieldInput id="password" label="Password" type="password" placeholder="Enter your password" />
          {selectedRole === "company" && companyMode === "signup" ? (
            <>
              <FieldInput id="confirmPassword" label="Confirm Password" type="password" placeholder="Re-enter your password" />
              <FieldInput id="contactPerson" label="Contact Person" placeholder="Hiring Manager" />
            </>
          ) : null}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {selectedRole === "company" && companyMode === "signup" ? "Create Account" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
