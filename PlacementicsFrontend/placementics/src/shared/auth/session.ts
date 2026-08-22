export type UserRole =
  | "Student"
  | "Teacher"
  | "Alumni"
  | "TPOAdmin"
  | "Company";

const ROLE_KEY = "placementics.role";

const VALID_ROLES: UserRole[] = [
  "Student",
  "Teacher",
  "Alumni",
  "TPOAdmin",
  "Company",
];

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
