import { LoginError } from "./authApi";

const ROLE_TO_BACKEND_ROLE = {
  Student: "STUDENT",
  Teacher: "TEACHER",
  Alumni: "ALUMNI",
  Company: "COMPANY",
} as const;

export type RegistrationRole = keyof typeof ROLE_TO_BACKEND_ROLE;

interface RegistrationParams {
  collegeId: string;
  role: RegistrationRole;
  fullName: string;
  email: string;
  password: string;
  instituteId: string;
  branch: string;
  year: string;
  department: string;
  batch: string;
  company: string;
  recruiterName: string;
}

function readErrorMessage(data: unknown): string {
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }
    if (typeof record.error === "string" && record.error.trim()) {
      return record.error;
    }
  }

  return "Could not submit registration. Please try again.";
}

export async function submitRegistration(
  params: RegistrationParams,
): Promise<void> {
  const role = ROLE_TO_BACKEND_ROLE[params.role];
  const body: Record<string, unknown> = {
    collegeId: params.collegeId,
    role,
    name: params.role === "Company" ? params.recruiterName : params.fullName,
    email: params.email.trim(),
    password: params.password,
  };

  if (params.role === "Student") {
    body.rollNo = params.instituteId.trim();
    body.batch = params.year.trim();
    body.department = params.branch.trim();
  }

  if (params.role === "Teacher") {
    body.department = params.department.trim();
  }

  if (params.role === "Alumni") {
    body.batch = params.batch.trim();
    body.companyName = params.company.trim();
    const passingYear = Number.parseInt(params.batch.trim(), 10);
    if (Number.isInteger(passingYear)) {
      body.passingYear = passingYear;
    }
  }

  if (params.role === "Company") {
    body.companyName = params.company.trim();
    body.designation = params.recruiterName.trim();
  }

  const response = await fetch("/api/registration-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw new LoginError(readErrorMessage(data));
  }
}
