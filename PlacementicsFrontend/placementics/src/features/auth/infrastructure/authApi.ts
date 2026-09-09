import { type UserRole } from "../domain/types";

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

interface RoleLoginConfig {
  collection: string;
  profilePath: (id: string) => string;
}

const ROLE_LOGIN: Record<UserRole, RoleLoginConfig> = {
  Student: {
    collection: "students",
    profilePath: (id) => `students/${id}`,
  },
  Teacher: {
    collection: "teachers",
    profilePath: (id) => `teachers/${id}`,
  },
  Alumni: {
    collection: "alumni",
    profilePath: (id) => `alumni/${id}`,
  },
  TPOAdmin: {
    collection: "tpos",
    profilePath: (id) => `tpos/${id}`,
  },
  Company: {
    collection: "companies",
    profilePath: (id) => `college-companies/${id}`,
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function readErrorMessage(data: unknown, fallback: string): string {
  if (!isRecord(data)) {
    return fallback;
  }

  if (typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data.error === "string" && data.error.trim()) {
    return data.error;
  }

  return fallback;
}

export async function fetchJson(
  url: string,
  notFoundMessage: string,
): Promise<unknown> {
  const response = await fetch(url, { cache: "no-store" });
  const data: unknown = await response.json().catch(() => null);

  if (response.status === 404) {
    throw new LoginError(notFoundMessage);
  }

  if (!response.ok) {
    throw new LoginError(readErrorMessage(data, "Could not complete login."));
  }

  return data;
}

export function roleLoginConfig(role: UserRole): RoleLoginConfig {
  return ROLE_LOGIN[role];
}

export function parseId(data: unknown): string {
  if (!isRecord(data) || typeof data.id !== "string" || !data.id) {
    throw new LoginError("Unexpected id response.");
  }

  return data.id;
}

export interface ProfileRecord {
  id: string;
  collegeId?: string;
  email?: string | null;
  name?: string | null;
  companyKey?: string | null;
}

export function parseProfile(data: unknown): ProfileRecord {
  if (!isRecord(data) || typeof data.id !== "string" || !data.id) {
    throw new LoginError("Unexpected account response.");
  }

  return {
    id: data.id,
    collegeId: typeof data.collegeId === "string" ? data.collegeId : undefined,
    email: typeof data.email === "string" ? data.email : null,
    name: typeof data.name === "string" ? data.name : null,
    companyKey: typeof data.companyKey === "string" ? data.companyKey : null,
  };
}
