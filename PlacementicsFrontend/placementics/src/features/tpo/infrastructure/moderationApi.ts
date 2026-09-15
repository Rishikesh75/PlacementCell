export interface FeedbackRecord {
  id: string;
  collegeCompanyId: string;
  alumniId: string;
  info: Array<{ round?: number; type?: string; details?: string }>;
  status: string;
}

export interface OpportunityRecord {
  id: string;
  alumniId?: string | null;
  teacherId?: string | null;
  collegeCompanyId: string;
  role: string;
  status: string;
  eligibility?: string | null;
  deadline?: string | null;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "Could not update this request.";
    throw new Error(message);
  }

  return data as T;
}

export function getPendingFeedback(collegeId: string) {
  return requestJson<FeedbackRecord[]>(
    `/api/interview-feedback/college/${encodeURIComponent(collegeId)}/pending`,
  );
}

export function approveFeedback(id: string) {
  return requestJson<FeedbackRecord>(
    `/api/interview-feedback/${encodeURIComponent(id)}/status?status=APPROVED`,
    { method: "PATCH" },
  );
}

export function getDraftOpportunities(collegeId: string) {
  return requestJson<OpportunityRecord[]>(
    `/api/placement-opportunities/college/${encodeURIComponent(collegeId)}/draft`,
  );
}

export function approveOpportunity(id: string) {
  return requestJson<OpportunityRecord>(
    `/api/placement-opportunities/${encodeURIComponent(id)}/status?status=OPEN`,
    { method: "PATCH" },
  );
}

export function rejectRecord(path: string, id: string) {
  return requestJson<void>(`${path}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function getApprovedFeedback(collegeId: string) {
  return requestJson<FeedbackRecord[]>(
    `/api/interview-feedback/college/${encodeURIComponent(collegeId)}/approved`,
  );
}

export function getApprovedOpportunities(collegeId: string) {
  return requestJson<OpportunityRecord[]>(
    `/api/placement-opportunities/college/${encodeURIComponent(collegeId)}/approved`,
  );
}