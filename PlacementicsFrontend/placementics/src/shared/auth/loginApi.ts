import { type AuthUser, type UserRole } from "@/shared/auth/session";

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

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

interface ProfileRecord {
  id: string;
  collegeId?: string;
  email?: string | null;
  name?: string | null;
  companyKey?: string | null;
}

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

async function getJson(url: string, notFoundMessage: string): Promise<unknown> {
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

function parseId(data: unknown): string {
  if (!isRecord(data) || typeof data.id !== "string" || !data.id) {
    throw new LoginError("Unexpected id response.");
  }

  return data.id;
}

function parseProfile(data: unknown): ProfileRecord {
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

export async function loginWithEmail(params: {
  role: UserRole;
  email: string;
  collegeId: string;
}): Promise<AuthUser> {
  const email = params.email.trim();
  const { collegeId, role } = params;
  const config = ROLE_LOGIN[role];
  const query = new URLSearchParams({ email, collegeId });

  const idData = await getJson(
    `/api/${config.collection}/by-email?${query.toString()}`,
    `No ${role.toLowerCase()} found for this institute email.`,
  );
  const userId = parseId(idData);

  const profileData = await getJson(
    `/api/${config.profilePath(userId)}`,
    "Could not load this account.",
  );
  const profile = parseProfile(profileData);

  if (profile.collegeId && profile.collegeId !== collegeId) {
    throw new LoginError(
      "This account does not belong to the selected institute.",
    );
  }

  if (profile.email && profile.email.toLowerCase() !== email.toLowerCase()) {
    throw new LoginError("This account does not match the email you entered.");
  }

  return {
    role,
    userId: profile.id,
    collegeId,
    email,
    name: profile.name ?? profile.companyKey ?? null,
  };
}
