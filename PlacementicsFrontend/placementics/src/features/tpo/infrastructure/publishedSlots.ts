import {
  MONTHS,
  placementDates,
  type MonthKey,
  type PlacementDate,
  type TimeSlot,
} from "./placementSlots";

const STORAGE_KEY = "placementics.publishedSlots";

const MONTH_FROM_INDEX: Record<number, MonthKey> = {
  10: "Nov",
  11: "Dec",
  0: "Jan",
  1: "Feb",
};

function cloneDates(dates: PlacementDate[]): PlacementDate[] {
  return dates.map((date) => ({
    ...date,
    slots: date.slots.map((slot) => ({ ...slot })),
  }));
}

export function getPublishedDates(): PlacementDate[] {
  if (typeof window === "undefined") {
    return cloneDates(placementDates);
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(placementDates));
      return cloneDates(placementDates);
    }

    const parsed = JSON.parse(stored) as PlacementDate[];

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return cloneDates(placementDates);
    }

    return parsed;
  } catch {
    return cloneDates(placementDates);
  }
}

export function publishDate(date: PlacementDate) {
  const current = getPublishedDates();
  const next = [...current.filter((item) => item.id !== date.id), date];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function monthsFromDates(dates: PlacementDate[]): MonthKey[] {
  const present = new Set(dates.map((date) => date.month));
  return MONTHS.filter((month) => present.has(month));
}

export function buildPlacementDate(
  isoDate: string,
  venue: string,
  times: string[],
): PlacementDate | null {
  const parsed = new Date(`${isoDate}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const month = MONTH_FROM_INDEX[parsed.getMonth()];

  if (!month) {
    return null;
  }

  const day = parsed.getDate();
  const monthShort = month.toUpperCase();
  const id = `${month.toLowerCase()}-${String(day).padStart(2, "0")}`;
  const weekdayFull = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);

  const slots: TimeSlot[] = times.map((label, index) => ({
    id: `${id}-${index}`,
    label,
    status: "available",
  }));

  return {
    id,
    month,
    day,
    monthShort,
    weekdayFull,
    venue,
    slots,
  };
}
