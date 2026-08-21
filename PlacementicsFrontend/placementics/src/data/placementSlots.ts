export type MonthKey = "Nov" | "Dec" | "Jan" | "Feb";

export type SlotStatus = "available" | "booked";

export interface TimeSlot {
  id: string;
  label: string;
  status: SlotStatus;
  bookedBy?: string;
}

export interface PlacementDate {
  id: string;
  month: MonthKey;
  day: number;
  monthShort: string;
  weekdayFull: string;
  venue: string;
  slots: TimeSlot[];
}

export const MONTHS: MonthKey[] = ["Nov", "Dec", "Jan", "Feb"];

export const SEASON_LABEL = "Nov 2025 – Feb 2026";

const TIMES = [
  "09:00 – 11:00",
  "11:30 – 13:30",
  "14:00 – 16:00",
  "16:30 – 18:30",
] as const;

function slots(
  dateId: string,
  booked: Record<number, string> = {},
): TimeSlot[] {
  return TIMES.map((label, index) => {
    const bookedBy = booked[index];
    return {
      id: `${dateId}-${index}`,
      label,
      status: bookedBy ? "booked" : "available",
      bookedBy,
    };
  });
}

export const placementDates: PlacementDate[] = [
  {
    id: "nov-12",
    month: "Nov",
    day: 12,
    monthShort: "NOV",
    weekdayFull: "Wednesday, 12 November 2025",
    venue: "Placement Cell Auditorium",
    slots: slots("nov-12", { 0: "Infosys", 2: "Zoho" }),
  },
  {
    id: "nov-21",
    month: "Nov",
    day: 21,
    monthShort: "NOV",
    weekdayFull: "Friday, 21 November 2025",
    venue: "Hall B",
    slots: slots("nov-21"),
  },
  {
    id: "dec-15",
    month: "Dec",
    day: 15,
    monthShort: "DEC",
    weekdayFull: "Monday, 15 December 2025",
    venue: "Placement Cell Auditorium",
    slots: slots("dec-15", { 0: "Goldman Sachs", 2: "Deloitte India" }),
  },
  {
    id: "dec-18",
    month: "Dec",
    day: 18,
    monthShort: "DEC",
    weekdayFull: "Thursday, 18 December 2025",
    venue: "Hall B",
    slots: slots("dec-18"),
  },
  {
    id: "dec-22",
    month: "Dec",
    day: 22,
    monthShort: "DEC",
    weekdayFull: "Monday, 22 December 2025",
    venue: "MS Teams",
    slots: slots("dec-22", {
      0: "Amazon",
      1: "Oracle",
      3: "TCS Digital",
    }),
  },
  {
    id: "dec-29",
    month: "Dec",
    day: 29,
    monthShort: "DEC",
    weekdayFull: "Monday, 29 December 2025",
    venue: "Seminar Hall",
    slots: slots("dec-29", {
      0: "Microsoft",
      1: "Adobe",
      2: "Qualcomm",
      3: "SAP Labs",
    }),
  },
  {
    id: "jan-08",
    month: "Jan",
    day: 8,
    monthShort: "JAN",
    weekdayFull: "Thursday, 8 January 2026",
    venue: "Placement Cell Auditorium",
    slots: slots("jan-08", { 1: "Cisco" }),
  },
  {
    id: "jan-19",
    month: "Jan",
    day: 19,
    monthShort: "JAN",
    weekdayFull: "Monday, 19 January 2026",
    venue: "Hall B",
    slots: slots("jan-19"),
  },
  {
    id: "feb-04",
    month: "Feb",
    day: 4,
    monthShort: "FEB",
    weekdayFull: "Wednesday, 4 February 2026",
    venue: "MS Teams",
    slots: slots("feb-04", { 0: "Accenture", 1: "Capgemini", 2: "Wipro" }),
  },
  {
    id: "feb-12",
    month: "Feb",
    day: 12,
    monthShort: "FEB",
    weekdayFull: "Thursday, 12 February 2026",
    venue: "Placement Cell Auditorium",
    slots: slots("feb-12"),
  },
];

export function availableCount(date: PlacementDate) {
  return date.slots.filter((slot) => slot.status === "available").length;
}

export function bookedCompanies(date: PlacementDate) {
  return date.slots
    .filter((slot) => slot.status === "booked" && slot.bookedBy)
    .map((slot) => slot.bookedBy as string);
}
