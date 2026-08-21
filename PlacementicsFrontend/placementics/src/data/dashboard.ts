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

export const seasonStats: SeasonStat[] = [
  {
    id: "placed",
    value: "94.2%",
    label: "Students placed",
    note: "↑ 3.1 pts vs last year",
    trend: "up",
  },
  {
    id: "average",
    value: "₹11.4L",
    label: "Average package",
    note: "↑ ₹0.9L vs last year",
    trend: "up",
  },
  {
    id: "highest",
    value: "₹52L",
    label: "Highest package",
    note: "Core Engineering",
    trend: "neutral",
  },
  {
    id: "companies",
    value: "86",
    label: "Companies visited",
    note: "↑ 12 new recruiters",
    trend: "up",
  },
];

export const placementRateByYear: PlacementRatePoint[] = [
  { year: "'21", rate: 78 },
  { year: "'22", rate: 82 },
  { year: "'23", rate: 86 },
  { year: "'24", rate: 91 },
  { year: "'25", rate: 91.1 },
  { year: "'26", rate: 94.2, current: true },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    kind: "research",
    text: "Prof. S. Iyer posted a research opening — ML for Structural Health Monitoring",
    time: "2 hours ago",
    href: "/JobopportunitiesBoardPage",
  },
  {
    id: "a2",
    kind: "feedback",
    text: "Deloitte India feedback added — 4 interview rounds, case study",
    time: "yesterday",
    href: "/feedbackOnCompanyInterviewPage",
  },
  {
    id: "a3",
    kind: "alumni",
    text: "Meera R. (Alumna, '22) shared an opening at Razorpay — SDE",
    time: "11 days ago",
    href: "/JobopportunitiesBoardPage",
  },
];

export const topRecruiters: RecruiterStat[] = [
  { id: "gs", name: "Goldman Sachs", packageAvg: "₹38L avg" },
  { id: "ms", name: "Microsoft IDC", packageAvg: "₹34L avg" },
  { id: "ti", name: "Texas Instruments", packageAvg: "₹29L avg" },
  { id: "tcs", name: "TCS Digital", packageAvg: "₹9.5L avg" },
  { id: "di", name: "Deloitte India", packageAvg: "₹13L avg" },
];

export const openRightNow: OpenStat[] = [
  {
    id: "jobs",
    label: "Job openings",
    value: "14 active",
    href: "/JobopportunitiesBoardPage",
  },
  {
    id: "research",
    label: "Research openings",
    value: "6 active",
    href: "/JobopportunitiesBoardPage",
  },
  {
    id: "feedback",
    label: "Companies with feedback",
    value: "61 of 86",
    href: "/feedbackOnCompanyInterviewPage",
  },
];
