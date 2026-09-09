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

export type FeedbackRound = {
  heading: string;
  questions: string[];
};

export interface StudentFeedback {
  id: number;
  companyId: number;
  studentLabel: string;
  submittedOn: string;
  rating: number;
  roundDetails: FeedbackRound[];
}
