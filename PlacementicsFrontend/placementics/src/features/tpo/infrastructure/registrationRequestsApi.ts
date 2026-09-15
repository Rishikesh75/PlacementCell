import type { RegistrationKind, RequestStatus, TpoRequest } from "../domain/types";

interface RegistrationRequestRecord {
  id: string;
  role: "STUDENT" | "TEACHER" | "ALUMNI" | "COMPANY";
  name: string;
  email: string;
  rollNo?: string | null;
  batch?: string | null;
  department?: string | null;
  passingYear?: number | null;
  companyName?: string | null;
  designation?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
}

const ROLE_TO_KIND: Record<RegistrationRequestRecord["role"], RegistrationKind> = {
  STUDENT: "student",
  TEACHER: "teacher",
  ALUMNI: "alumni",
  COMPANY: "company",
};

function toStatus(status: RegistrationRequestRecord["status"]): RequestStatus {
  return status.toLowerCase() as RequestStatus;
}

function toRequest(record: RegistrationRequestRecord): TpoRequest {
  const kind = ROLE_TO_KIND[record.role];
  const detail =
    record.role === "STUDENT"
      ? `${record.department ?? "Student"} · ${record.batch ?? ""} · institute ID ${record.rollNo ?? ""}`
      : record.role === "TEACHER"
        ? `${record.department ?? "Faculty"} · ${record.email}`
        : record.role === "ALUMNI"
          ? `Class of ${record.passingYear ?? record.batch ?? ""} · ${record.companyName ?? "Alumni"}`
          : `${record.designation ?? "Recruiter"} · ${record.email}`;

  return {
    id: record.id,
    queue: "registrations",
    kind,
    title: record.role === "COMPANY" ? record.companyName ?? record.name : record.name,
    detail,
    submittedOn: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(record.submittedAt)),
    status: toStatus(record.status),
  };
}

async function readResponse(response: Response): Promise<unknown> {
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "Could not update registration request.";
    throw new Error(message);
  }

  return data;
}

export async function getRegistrationRequests(
  collegeId: string,
): Promise<TpoRequest[]> {
  const response = await fetch(
    `/api/registration-requests?collegeId=${encodeURIComponent(collegeId)}`,
    { cache: "no-store" },
  );
  const data = await readResponse(response);

  return Array.isArray(data)
    ? (data as RegistrationRequestRecord[]).map(toRequest)
    : [];
}

export async function decideRegistrationRequest(
  id: string,
  status: Exclude<RequestStatus, "pending">,
): Promise<TpoRequest> {
  const action = status === "approved" ? "approve" : "reject";
  const response = await fetch(`/api/registration-requests/${encodeURIComponent(id)}/${action}`, {
    method: "PATCH",
  });
  const data = await readResponse(response);

  return toRequest(data as RegistrationRequestRecord);
}