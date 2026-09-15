import type { CollegeCompanyOption } from "@/features/feedback/infrastructure/feedbackApi";

export type { CollegeCompanyOption };

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "Could not submit opportunity.";
    throw new Error(message);
  }

  return data as T;
}

export function getOpportunityCompanies(collegeId: string) {
  return requestJson<CollegeCompanyOption[]>(
    `/api/college-companies/college/${encodeURIComponent(collegeId)}`,
  );
}

export function createPlacementOpportunity(body: {
  alumniId?: string;
  teacherId?: string;
  collegeCompanyId: string;
  role: string;
  eligibility: string;
  deadline?: string;
}) {
  return requestJson("/api/placement-opportunities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, status: "DRAFT" }),
  });
}
