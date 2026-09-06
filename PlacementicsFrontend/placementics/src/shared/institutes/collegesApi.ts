const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://placelytics.onrender.com";

export interface College {
  id: string;
  name: string;
  address: string | null;
  contact: string | null;
  imageFileName: string | null;
  imageUrl: string | null;
  verifiedStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function fetchColleges(): Promise<College[]> {
  const response = await fetch(`${API_BASE}/api/colleges`);

  if (!response.ok) {
    throw new Error(`Failed to load colleges (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Unexpected colleges response");
  }

  return data as College[];
}

export function collegeInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
