export type UserRole =
  | "Student"
  | "Teacher"
  | "Alumni"
  | "TPOAdmin"
  | "Company";

export interface AuthUser {
  role: UserRole;
  userId: string;
  collegeId: string;
  email: string;
  name: string | null;
}

export const VALID_ROLES: UserRole[] = [
  "Student",
  "Teacher",
  "Alumni",
  "TPOAdmin",
  "Company",
];
