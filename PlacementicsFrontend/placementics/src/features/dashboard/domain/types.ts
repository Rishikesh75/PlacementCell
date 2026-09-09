export type DashboardYear =
  | "2021–22"
  | "2022–23"
  | "2023–24"
  | "2024–25"
  | "2025–26";

export interface SeasonStat {
  id: string;
  value: string;
  label: string;
  note: string;
  trend?: "up" | "neutral";
}

export interface PlacementRatePoint {
  year: string;
  rate: number;
  season: DashboardYear;
  current?: boolean;
}

export type ActivityKind = "research" | "feedback" | "alumni";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  text: string;
  time: string;
  href: string;
}

export interface RecruiterStat {
  id: string;
  name: string;
  packageAvg: string;
}

export interface OpenStat {
  id: string;
  label: string;
  value: string;
  href: string;
}
