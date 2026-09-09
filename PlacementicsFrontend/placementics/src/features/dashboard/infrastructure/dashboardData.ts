import type {
  ActivityItem,
  DashboardYear,
  OpenStat,
  PlacementRatePoint,
  RecruiterStat,
  SeasonStat,
} from "../domain/types";

export type {
  ActivityItem,
  ActivityKind,
  DashboardYear,
  OpenStat,
  PlacementRatePoint,
  RecruiterStat,
  SeasonStat,
} from "../domain/types";

export const DASHBOARD_YEARS: DashboardYear[] = [
  "2021–22",
  "2022–23",
  "2023–24",
  "2024–25",
  "2025–26",
];

export const LAST_YEAR: DashboardYear = "2024–25";
export const CURRENT_YEAR: DashboardYear = "2025–26";

export const statsByYear: Record<DashboardYear, SeasonStat[]> = {
  "2021–22": [
    {
      id: "placed",
      value: "78%",
      label: "Students placed",
      note: "Season close",
      trend: "neutral",
    },
    {
      id: "average",
      value: "₹8.4L",
      label: "Average package",
      note: "Across all branches",
      trend: "neutral",
    },
    {
      id: "highest",
      value: "₹32L",
      label: "Highest package",
      note: "Software",
      trend: "neutral",
    },
    {
      id: "companies",
      value: "54",
      label: "Companies visited",
      note: "Campus + virtual",
      trend: "neutral",
    },
  ],
  "2022–23": [
    {
      id: "placed",
      value: "82%",
      label: "Students placed",
      note: "↑ 4 pts vs prior year",
      trend: "up",
    },
    {
      id: "average",
      value: "₹9.1L",
      label: "Average package",
      note: "↑ ₹0.7L vs prior year",
      trend: "up",
    },
    {
      id: "highest",
      value: "₹38L",
      label: "Highest package",
      note: "Software",
      trend: "neutral",
    },
    {
      id: "companies",
      value: "61",
      label: "Companies visited",
      note: "↑ 7 new recruiters",
      trend: "up",
    },
  ],
  "2023–24": [
    {
      id: "placed",
      value: "86%",
      label: "Students placed",
      note: "↑ 4 pts vs prior year",
      trend: "up",
    },
    {
      id: "average",
      value: "₹9.8L",
      label: "Average package",
      note: "↑ ₹0.7L vs prior year",
      trend: "up",
    },
    {
      id: "highest",
      value: "₹42L",
      label: "Highest package",
      note: "Core + software",
      trend: "neutral",
    },
    {
      id: "companies",
      value: "68",
      label: "Companies visited",
      note: "↑ 7 new recruiters",
      trend: "up",
    },
  ],
  "2024–25": [
    {
      id: "placed",
      value: "91.1%",
      label: "Students placed",
      note: "↑ 5.1 pts vs prior year",
      trend: "up",
    },
    {
      id: "average",
      value: "₹10.5L",
      label: "Average package",
      note: "↑ ₹0.7L vs prior year",
      trend: "up",
    },
    {
      id: "highest",
      value: "₹48L",
      label: "Highest package",
      note: "Software",
      trend: "neutral",
    },
    {
      id: "companies",
      value: "74",
      label: "Companies visited",
      note: "↑ 6 new recruiters",
      trend: "up",
    },
  ],
  "2025–26": [
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
  ],
};

export const seasonStats = statsByYear[CURRENT_YEAR];

export const recruitersByYear: Record<DashboardYear, RecruiterStat[]> = {
  "2021–22": [
    { id: "tcs", name: "TCS", packageAvg: "₹7.2L avg" },
    { id: "infy", name: "Infosys", packageAvg: "₹6.8L avg" },
    { id: "wipro", name: "Wipro", packageAvg: "₹6.5L avg" },
    { id: "lnt", name: "L&T", packageAvg: "₹7.5L avg" },
    { id: "bosch", name: "Bosch", packageAvg: "₹8.1L avg" },
  ],
  "2022–23": [
    { id: "tcs", name: "TCS Digital", packageAvg: "₹8.5L avg" },
    { id: "infy", name: "Infosys", packageAvg: "₹7.4L avg" },
    { id: "zoho", name: "Zoho", packageAvg: "₹10L avg" },
    { id: "lnt", name: "L&T", packageAvg: "₹8L avg" },
    { id: "qc", name: "Qualcomm", packageAvg: "₹18L avg" },
  ],
  "2023–24": [
    { id: "ms", name: "Microsoft IDC", packageAvg: "₹28L avg" },
    { id: "gs", name: "Goldman Sachs", packageAvg: "₹32L avg" },
    { id: "zoho", name: "Zoho", packageAvg: "₹12L avg" },
    { id: "tcs", name: "TCS Digital", packageAvg: "₹9L avg" },
    { id: "di", name: "Deloitte India", packageAvg: "₹11L avg" },
  ],
  "2024–25": [
    { id: "gs", name: "Goldman Sachs", packageAvg: "₹36L avg" },
    { id: "ms", name: "Microsoft IDC", packageAvg: "₹32L avg" },
    { id: "am", name: "Amazon", packageAvg: "₹30L avg" },
    { id: "qc", name: "Qualcomm", packageAvg: "₹22L avg" },
    { id: "tcs", name: "TCS Digital", packageAvg: "₹9.2L avg" },
  ],
  "2025–26": [
    { id: "gs", name: "Goldman Sachs", packageAvg: "₹38L avg" },
    { id: "ms", name: "Microsoft IDC", packageAvg: "₹34L avg" },
    { id: "ti", name: "Texas Instruments", packageAvg: "₹29L avg" },
    { id: "tcs", name: "TCS Digital", packageAvg: "₹9.5L avg" },
    { id: "di", name: "Deloitte India", packageAvg: "₹13L avg" },
  ],
};

export const topRecruiters = recruitersByYear[CURRENT_YEAR];

export const placementRateByYear: PlacementRatePoint[] = [
  { year: "'21", rate: 78, season: "2021–22" },
  { year: "'22", rate: 82, season: "2022–23" },
  { year: "'23", rate: 86, season: "2023–24" },
  { year: "'24", rate: 91, season: "2024–25" },
  { year: "'25", rate: 91.1, season: "2024–25" },
  { year: "'26", rate: 94.2, season: "2025–26", current: true },
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
