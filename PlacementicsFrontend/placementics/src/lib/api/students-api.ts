import type { StudentApiResponse } from "@/src/lib/domain/entities/user.entity";
import { apiFetch } from "./http-client";
import { APP_CONSTANTS } from "@/src/lib/constants/app.constants";

const baseUrl = `${APP_CONSTANTS.API.BASE_URL}${APP_CONSTANTS.API.ENDPOINTS.STUDENTS}`;

function normalizeStudent(raw: Record<string, unknown>): StudentApiResponse {
  return {
    id: String(raw.id ?? raw.Id ?? ""),
    password: String(raw.password ?? raw.Password ?? ""),
    name: String(raw.name ?? raw.Name ?? ""),
    email: String(raw.email ?? raw.Email ?? ""),
    major: raw.major ? String(raw.major) : raw.Major ? String(raw.Major) : undefined,
    graduationYear:
      typeof raw.graduationYear === "number"
        ? raw.graduationYear
        : typeof raw.GraduationYear === "number"
          ? raw.GraduationYear
          : undefined,
  };
}

export async function getStudentById(
  id: string,
): Promise<StudentApiResponse | null> {
  try {
    const raw = await apiFetch<Record<string, unknown>>(
      `${baseUrl}/${encodeURIComponent(id)}`,
    );
    return normalizeStudent(raw);
  } catch (error) {
    if (
      error instanceof Error &&
      "status" in error &&
      (error as { status: number }).status === 404
    ) {
      return null;
    }
    throw error;
  }
}

export async function getAllStudents(): Promise<StudentApiResponse[]> {
  const raw = await apiFetch<Record<string, unknown>[]>(baseUrl);
  return raw.map(normalizeStudent);
}
