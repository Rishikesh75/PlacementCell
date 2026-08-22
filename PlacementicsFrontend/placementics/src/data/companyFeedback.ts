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

export const studentFeedbacks: StudentFeedback[] = [
  {
    id: 101,
    companyId: 1,
    studentLabel: "CS · Batch 2026",
    submittedOn: "16 Nov 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: [
          "Two-sum variant on unsorted arrays with a follow-up on duplicates.",
          "Binary search on a rotated sorted array.",
        ],
      },
      {
        heading: "Technical round",
        questions: [
          "HLD: design a trade blotter that handles bursty market data.",
          "Core: explain virtual memory and how paging affects latency.",
        ],
      },
      {
        heading: "HR round",
        questions: [
          "Why Goldman Sachs over a product company?",
          "A time you disagreed with a teammate and how it ended.",
        ],
      },
    ],
  },
  {
    id: 102,
    companyId: 1,
    studentLabel: "CS · Batch 2026",
    submittedOn: "17 Nov 2025",
    rating: 5,
    roundDetails: [
      {
        heading: "Coding round",
        questions: [
          "Implement LRU cache, then discuss thread safety.",
          "Graph: shortest path with weighted edges on a small grid.",
        ],
      },
      {
        heading: "Technical round",
        questions: [
          "LLD: model an order matching engine at class level.",
          "Core: TCP vs UDP and when you would pick each.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Walk through a project you would redo and why."],
      },
    ],
  },
  {
    id: 103,
    companyId: 1,
    studentLabel: "CS · Batch 2027",
    submittedOn: "18 Nov 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["DP: house robber on a circular street of houses."],
      },
      {
        heading: "Technical round",
        questions: [
          "HLD: notification service for millions of users.",
          "Core: difference between process and thread, with examples.",
        ],
      },
      {
        heading: "HR round",
        questions: ["What does culture fit mean to you on a trading floor team?"],
      },
    ],
  },
  {
    id: 201,
    companyId: 2,
    studentLabel: "CS · Batch 2026",
    submittedOn: "23 Nov 2025",
    rating: 3,
    roundDetails: [
      {
        heading: "Case study round",
        questions: [
          "A retailer is losing margin — structure the problem and pick 3 analyses.",
        ],
      },
      {
        heading: "Technical round",
        questions: ["Walk through a dashboard you would build for that case."],
      },
      {
        heading: "HR round",
        questions: ["Why consulting, and why Deloitte specifically?"],
      },
    ],
  },
  {
    id: 202,
    companyId: 2,
    studentLabel: "CS · Batch 2026",
    submittedOn: "24 Nov 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Case study round",
        questions: [
          "Market-entry case for a fintech expanding into a new state.",
        ],
      },
      {
        heading: "HR round",
        questions: [
          "Describe a time you had to influence without authority.",
        ],
      },
    ],
  },
  {
    id: 203,
    companyId: 2,
    studentLabel: "CS · Batch 2027",
    submittedOn: "25 Nov 2025",
    rating: 3,
    roundDetails: [
      {
        heading: "Case study round",
        questions: ["GD was dropped; they went straight to a 20-minute case."],
      },
      {
        heading: "Technical round",
        questions: ["Excel + SQL: how would you join campaign and sales data?"],
      },
    ],
  },
  {
    id: 301,
    companyId: 3,
    studentLabel: "CS · Batch 2026",
    submittedOn: "4 Dec 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: [
          "Arrays: merge overlapping intervals.",
          "Trees: serialize and deserialize a binary tree.",
        ],
      },
      {
        heading: "Technical round",
        questions: [
          "HLD: design a distributed cache with TTL.",
          "LLD: parking lot with multiple vehicle types.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Tell me about a time you shipped under a tight deadline."],
      },
    ],
  },
  {
    id: 302,
    companyId: 3,
    studentLabel: "CS · Batch 2026",
    submittedOn: "5 Dec 2025",
    rating: 5,
    roundDetails: [
      {
        heading: "Coding round",
        questions: [
          "Graph: detect a cycle and return one path.",
          "DP: longest increasing subsequence, then optimize space.",
        ],
      },
      {
        heading: "Technical round",
        questions: ["HLD: newsfeed for a social product, ranking included."],
      },
    ],
  },
  {
    id: 303,
    companyId: 3,
    studentLabel: "CS · Batch 2027",
    submittedOn: "6 Dec 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["Stack: next greater element, then a monotonic queue follow-up."],
      },
      {
        heading: "Technical round",
        questions: ["Core: how does garbage collection work in a managed runtime?"],
      },
      {
        heading: "HR round",
        questions: ["Why Microsoft IDC and not another product office?"],
      },
    ],
  },
  {
    id: 401,
    companyId: 4,
    studentLabel: "ECE · Batch 2026",
    submittedOn: "10 Dec 2025",
    rating: 3,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["Easy array rotation and a string palindrome check."],
      },
      {
        heading: "Technical round",
        questions: [
          "Walk through your final-year project and the hardest bug.",
        ],
      },
    ],
  },
  {
    id: 402,
    companyId: 4,
    studentLabel: "ECE · Batch 2026",
    submittedOn: "11 Dec 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["SQL-style grouping question disguised as an array problem."],
      },
      {
        heading: "Technical round",
        questions: ["Core electronics: explain an op-amp circuit from your lab."],
      },
      {
        heading: "HR round",
        questions: ["Are you open to relocation and night-shift support roles?"],
      },
    ],
  },
  {
    id: 403,
    companyId: 4,
    studentLabel: "ECE · Batch 2027",
    submittedOn: "12 Dec 2025",
    rating: 3,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["Very straightforward — two pointer on a sorted array."],
      },
      {
        heading: "Technical round",
        questions: ["Mostly project deep-dive; little DSA after the first round."],
      },
    ],
  },
  {
    id: 501,
    companyId: 5,
    studentLabel: "ME · Batch 2026",
    submittedOn: "19 Nov 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Aptitude screen",
        questions: ["Short numerical + mechanical reasoning paper on campus."],
      },
      {
        heading: "Technical round",
        questions: [
          "Core: GD&T on a shaft drawing they handed over.",
          "Explain your internship on the shop floor.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Willingness to work at a project site for the first year."],
      },
    ],
  },
  {
    id: 502,
    companyId: 5,
    studentLabel: "ME · Batch 2026",
    submittedOn: "20 Nov 2025",
    rating: 4,
    roundDetails: [
      {
        heading: "Technical round",
        questions: [
          "Strength of materials: bending moment on a simply supported beam.",
          "Manufacturing: difference between forging and casting for a gear.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Why L&T over a pure design-office role?"],
      },
    ],
  },
  {
    id: 503,
    companyId: 5,
    studentLabel: "ME · Batch 2027",
    submittedOn: "21 Nov 2025",
    rating: 5,
    roundDetails: [
      {
        heading: "Aptitude screen",
        questions: ["Campus aptitude felt organised; results the same evening."],
      },
      {
        heading: "Technical round",
        questions: ["CAD test: model a bracket and talk through constraints."],
      },
    ],
  },
  {
    id: 601,
    companyId: 6,
    studentLabel: "CS · Batch 2025",
    submittedOn: "13 Oct 2024",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: [
          "Two back-to-back DSA interviews: graphs then DP on strings.",
        ],
      },
      {
        heading: "Technical round",
        questions: ["LP: tell me about a time you disagreed with data."],
      },
      {
        heading: "HR round",
        questions: ["Ownership story they kept circling back to."],
      },
    ],
  },
  {
    id: 602,
    companyId: 6,
    studentLabel: "CS · Batch 2025",
    submittedOn: "14 Oct 2024",
    rating: 5,
    roundDetails: [
      {
        heading: "Coding round",
        questions: [
          "Trees: lowest common ancestor with parent pointers missing.",
          "Arrays: product of array except self without division.",
        ],
      },
      {
        heading: "Technical round",
        questions: ["HLD: design Amazon's similar-items widget."],
      },
      {
        heading: "HR round",
        questions: ["Customer obsession example from a campus project."],
      },
    ],
  },
  {
    id: 603,
    companyId: 6,
    studentLabel: "CS · Batch 2026",
    submittedOn: "15 Oct 2024",
    rating: 4,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["Stack + queue: sliding window maximum."],
      },
      {
        heading: "Technical round",
        questions: [
          "LP questions in every round — prepare stories, not only code.",
        ],
      },
    ],
  },
  {
    id: 701,
    companyId: 7,
    studentLabel: "ECE · Batch 2025",
    submittedOn: "6 Nov 2024",
    rating: 4,
    roundDetails: [
      {
        heading: "Technical round",
        questions: [
          "Digital design: FSM for a traffic light, then timing closure.",
          "Verilog: write an ALU snippet and explain blocking vs non-blocking.",
        ],
      },
      {
        heading: "Technical round",
        questions: ["Computer architecture: pipeline hazards and forwarding."],
      },
      {
        heading: "HR round",
        questions: ["Are you comfortable with a hardware-heavy first posting?"],
      },
    ],
  },
  {
    id: 702,
    companyId: 7,
    studentLabel: "ECE · Batch 2025",
    submittedOn: "7 Nov 2024",
    rating: 5,
    roundDetails: [
      {
        heading: "Coding round",
        questions: ["Bit manipulation: count set bits, then a mask puzzle."],
      },
      {
        heading: "Technical round",
        questions: [
          "Setup and hold time with a waveform they drew on the board.",
        ],
      },
    ],
  },
  {
    id: 703,
    companyId: 7,
    studentLabel: "ECE · Batch 2026",
    submittedOn: "8 Nov 2024",
    rating: 3,
    roundDetails: [
      {
        heading: "Technical round",
        questions: [
          "Verilog-heavy; they asked me to debug a race in simulation.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Relocation to Hyderabad and notice period if any internships overlapped."],
      },
    ],
  },
  {
    id: 801,
    companyId: 8,
    studentLabel: "ME · Batch 2025",
    submittedOn: "21 Sep 2024",
    rating: 3,
    roundDetails: [
      {
        heading: "CAD test",
        questions: ["Model a housing in SolidWorks from a 2D drawing."],
      },
      {
        heading: "Technical round",
        questions: [
          "Manufacturing process for the part I modelled, including tolerances.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Talk through your internship and what you would change."],
      },
    ],
  },
  {
    id: 802,
    companyId: 8,
    studentLabel: "ME · Batch 2025",
    submittedOn: "22 Sep 2024",
    rating: 4,
    roundDetails: [
      {
        heading: "CAD test",
        questions: ["Assembly constraints on a simple gearbox."],
      },
      {
        heading: "Technical round",
        questions: ["Panel on manufacturing plus a GD&T callout they circled."],
      },
    ],
  },
  {
    id: 803,
    companyId: 8,
    studentLabel: "ME · Batch 2026",
    submittedOn: "23 Sep 2024",
    rating: 3,
    roundDetails: [
      {
        heading: "Technical round",
        questions: [
          "Core mechanical: heat treatment of steels used in automotive parts.",
        ],
      },
      {
        heading: "HR round",
        questions: ["Why Bosch and not a pure automotive OEM?"],
      },
    ],
  },
];

export function getCompanyFeedback(id: number): CompanyFeedback | undefined {
  return companyFeedback.find((item) => item.id === id);
}

export function getStudentFeedbacks(companyId: number): StudentFeedback[] {
  return studentFeedbacks.filter((item) => item.companyId === companyId);
}
