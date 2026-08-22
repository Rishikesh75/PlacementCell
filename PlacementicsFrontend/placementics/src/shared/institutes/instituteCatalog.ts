import { institutes, type Institute } from "@/data/institutes";

export interface CreatedInstitute extends Institute {
  tpoName: string;
  tpoEmail: string;
  createdOn: string;
}

const STORAGE_KEY = "placementics.createdInstitutes";

function cloneInstitutes(items: Institute[]): Institute[] {
  return items.map((item) => ({ ...item }));
}

export function getCreatedInstitutes(): CreatedInstitute[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as CreatedInstitute[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCreatedInstitute(institute: CreatedInstitute) {
  const current = getCreatedInstitutes();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([institute, ...current]),
  );
}

export function getAllInstitutes(): Institute[] {
  return [...cloneInstitutes(institutes), ...getCreatedInstitutes()];
}

export function nextInstituteId(): number {
  const ids = getAllInstitutes().map((item) => item.id);
  return (ids.length === 0 ? 0 : Math.max(...ids)) + 1;
}
