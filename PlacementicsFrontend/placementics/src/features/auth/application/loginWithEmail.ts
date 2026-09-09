import { type AuthUser, type UserRole } from "../domain/types";
import {
  LoginError,
  fetchJson,
  parseId,
  parseProfile,
  roleLoginConfig,
} from "../infrastructure/authApi";

export { LoginError };

export async function loginWithEmail(params: {
  role: UserRole;
  email: string;
  collegeId: string;
}): Promise<AuthUser> {
  const email = params.email.trim();
  const { collegeId, role } = params;
  const config = roleLoginConfig(role);
  const query = new URLSearchParams({ email, collegeId });

  const idData = await fetchJson(
    `/api/${config.collection}/by-email?${query.toString()}`,
    `No ${role.toLowerCase()} found for this institute email.`,
  );
  const userId = parseId(idData);

  const profileData = await fetchJson(
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
