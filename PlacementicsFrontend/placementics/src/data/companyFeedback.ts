export type FeedbackYear = "2025–26" | "2024–25";

export type FeedbackBranch =
  | "Computer Science"
  | "Electronics"
  | "Mechanical";

export interface CompanyFeedback {
  id: number;
  initials: string;
  company: string;
  role: string;
  visitedOn: string;
  year: FeedbackYear;
  branch: FeedbackBranch;
  rounds: number;
  packageLpa: number;
  rating: number;
  studentCount: number;
  snippet: string;
}

export const companyFeedback: CompanyFeedback[] = [
  {
    id: 1,
    initials: "GS",
    company: "Goldman Sachs",
    role: "Technology Analyst",
    visitedOn: "14 Nov 2025",
    year: "2025–26",
    branch: "Computer Science",
    rounds: 4,
    packageLpa: 38,
    rating: 4,
    studentCount: 18,
    snippet: "Strong on DSA + system design, one HR round on culture fit.",
  },
  {
    id: 2,
    initials: "DI",
    company: "Deloitte India",
    role: "Analyst, Consulting",
    visitedOn: "22 Nov 2025",
    year: "2025–26",
    branch: "Computer Science",
    rounds: 3,
    packageLpa: 12,
    rating: 3,
    studentCount: 24,
    snippet: "Case study round was the real filter, GD dropped this year.",
  },
  {
    id: 3,
    initials: "MS",
    company: "Microsoft IDC",
    role: "SDE",
    visitedOn: "3 Dec 2025",
    year: "2025–26",
    branch: "Computer Science",
    rounds: 5,
    packageLpa: 34,
    rating: 4,
    studentCount: 21,
    snippet: "Two DSA rounds, one design round, very structured.",
  },
  {
    id: 4,
    initials: "TC",
    company: "TCS Digital",
    role: "Systems Engineer",
    visitedOn: "9 Dec 2025",
    year: "2025–26",
    branch: "Electronics",
    rounds: 2,
    packageLpa: 9.5,
    rating: 3,
    studentCount: 31,
    snippet: "Coding round was easy, interview mostly about projects.",
  },
  {
    id: 5,
    initials: "LT",
    company: "L&T",
    role: "Graduate Engineer Trainee",
    visitedOn: "18 Nov 2025",
    year: "2025–26",
    branch: "Mechanical",
    rounds: 3,
    packageLpa: 8,
    rating: 4,
    studentCount: 14,
    snippet: "Core mechanical plus a short aptitude screen, campus visit felt organised.",
  },
  {
    id: 6,
    initials: "AM",
    company: "Amazon",
    role: "SDE",
    visitedOn: "12 Oct 2024",
    year: "2024–25",
    branch: "Computer Science",
    rounds: 4,
    packageLpa: 32,
    rating: 4,
    studentCount: 16,
    snippet: "LP questions in every round, two coding interviews back to back.",
  },
  {
    id: 7,
    initials: "QC",
    company: "Qualcomm",
    role: "Hardware Engineer",
    visitedOn: "5 Nov 2024",
    year: "2024–25",
    branch: "Electronics",
    rounds: 4,
    packageLpa: 22,
    rating: 4,
    studentCount: 11,
    snippet: "Digital design and Verilog-heavy, one round on computer architecture.",
  },
  {
    id: 8,
    initials: "BO",
    company: "Bosch",
    role: "Mechanical Design Engineer",
    visitedOn: "20 Sep 2024",
    year: "2024–25",
    branch: "Mechanical",
    rounds: 3,
    packageLpa: 10,
    rating: 3,
    studentCount: 9,
    snippet: "CAD test first, then a panel on manufacturing and internships.",
  },
];
