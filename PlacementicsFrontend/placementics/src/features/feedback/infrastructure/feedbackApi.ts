export interface CollegeCompanyOption {
  id: string;
  companyId: string;
  companyName: string;
  companyKey: string;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : "Could not submit feedback.";
    throw new Error(message);
  }

  return data as T;
}

export function getCollegeCompanies(collegeId: string) {
  return requestJson<CollegeCompanyOption[]>(
    `/api/college-companies/college/${encodeURIComponent(collegeId)}`,
  );
}

export function createInterviewFeedback(body: {
  collegeCompanyId: string;
  alumniId: string;
  info: Array<{ heading: string; questions: string[] }>;
}) {
  return requestJson("/api/interview-feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, status: "PENDING" }),
  });
}
