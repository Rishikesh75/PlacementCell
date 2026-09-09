import { VALID_ROLES, type AuthUser, type UserRole } from "../domain/types";

export type { AuthUser, UserRole };

const ROLE_KEY = "placementics.role";
const USER_KEY = "placementics.user";

export function getCurrentRole(): UserRole {
  if (typeof window === "undefined") {
    return "Student";
  }

  const stored = window.localStorage.getItem(ROLE_KEY);

  if (stored && VALID_ROLES.includes(stored as UserRole)) {
    return stored as UserRole;
  }

  return "Student";
}

export function setCurrentRole(role: string) {
  if (typeof window === "undefined") {
    return;
  }

  if (VALID_ROLES.includes(role as UserRole)) {
    window.localStorage.setItem(ROLE_KEY, role);
  }
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(USER_KEY);

  if (!stored) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("role" in parsed) ||
      !("userId" in parsed) ||
      !("collegeId" in parsed) ||
      !("email" in parsed)
    ) {
      return null;
    }

    const user = parsed as AuthUser;

    if (!VALID_ROLES.includes(user.role)) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser) {
  if (typeof window === "undefined") {
    return;
  }

  setCurrentRole(user.role);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}
