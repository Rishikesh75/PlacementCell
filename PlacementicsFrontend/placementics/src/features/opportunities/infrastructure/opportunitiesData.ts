import type { Opportunity } from "../domain/types";

export type {
  Opportunity,
  OpportunityKind,
  OpportunityPoster,
  PosterRole,
} from "../domain/types";

export const opportunities: Opportunity[] = [
  {
    id: 1,
    kind: "job",
    title: "SDE II — Backend",
    meta: "Razorpay · Bengaluru · ₹28–32L",
    description:
      "Hiring for the payments platform team. Looking for 2+ years backend, preferably Java or Go. Referral available — reach out.",
    poster: {
      initials: "MR",
      name: "Meera R.",
      caption: "Alumna, Class of 2022",
      role: "alumni",
    },
    postedAgo: "2d ago",
  },
  {
    id: 2,
    kind: "research",
    title: "ML for Structural Health Monitoring",
    meta: "Dept. of Civil Engineering · Funded project",
    description:
      "6-month RA position, stipend ₹35k. Need a student comfortable with Python and sensor data. Starts next month.",
    poster: {
      initials: "SI",
      name: "Prof. S. Iyer",
      caption: "Dept. of Civil Engineering",
      role: "faculty",
    },
    postedAgo: "5d ago",
  },
  {
    id: 3,
    kind: "job",
    title: "Product Analyst",
    meta: "Zoho Corporation · Chennai · ₹12–16L",
    description:
      "Fresh grads welcome. Mix of SQL, product sense, and stakeholder work. I can walk you through the process if you ping me.",
    poster: {
      initials: "KV",
      name: "Karthik V.",
      caption: "Alumnus, Class of 2021",
      role: "alumni",
    },
    postedAgo: "1w ago",
  },
  {
    id: 4,
    kind: "research",
    title: "Battery Materials Simulation",
    meta: "Dept. of Metallurgical Engg. · Funded project",
    description:
      "Computational project on cathode materials. Prefer M.Tech or final-year B.Tech with some DFT or Python background.",
    poster: {
      initials: "NR",
      name: "Prof. N. Ramesh",
      caption: "Dept. of Metallurgical Engg.",
      role: "faculty",
    },
    postedAgo: "2h ago",
  },
  {
    id: 5,
    kind: "job",
    title: "Frontend Engineer",
    meta: "Freshworks · Chennai · ₹16–20L",
    description:
      "Product team building the next CRM surface. Strong React and TypeScript expected. Happy to refer a couple of people this cycle.",
    poster: {
      initials: "AS",
      name: "Ananya S.",
      caption: "Alumna, Class of 2020",
      role: "alumni",
    },
    postedAgo: "3d ago",
  },
  {
    id: 6,
    kind: "research",
    title: "NLP for Low-Resource Indian Languages",
    meta: "Dept. of Computer Science · Funded project",
    description:
      "Looking for a student RA to work on tokenisers and evaluation sets. Stipend ₹30k, 4–6 months. Tamil or Telugu fluency is a plus.",
    poster: {
      initials: "AK",
      name: "Prof. A. Krishnan",
      caption: "Dept. of Computer Science",
      role: "faculty",
    },
    postedAgo: "1d ago",
  },
  {
    id: 7,
    kind: "job",
    title: "Data Scientist",
    meta: "Flipkart · Bengaluru · ₹24–28L",
    description:
      "Recommendations and search ranking. Need someone who can ship models, not just notebooks. Referral open for 2026 graduates.",
    poster: {
      initials: "RM",
      name: "Rohan M.",
      caption: "Alumnus, Class of 2019",
      role: "alumni",
    },
    postedAgo: "4d ago",
  },
  {
    id: 8,
    kind: "job",
    title: "iOS Engineer",
    meta: "PhonePe · Bengaluru · ₹26–30L",
    description:
      "Payments app team. Swift, UIKit, and a bit of SwiftUI. One to three years of experience — internships count if the work was real.",
    poster: {
      initials: "DK",
      name: "Divya K.",
      caption: "Alumna, Class of 2021",
      role: "alumni",
    },
    postedAgo: "6d ago",
  },
  {
    id: 9,
    kind: "research",
    title: "Wireless Sensor Networks for Smart Campus",
    meta: "Dept. of Electronics · Funded project",
    description:
      "Hardware + firmware RA. Comfortable with ESP32 / LoRa and some networking. Lab work starts this semester.",
    poster: {
      initials: "RM",
      name: "Prof. R. Menon",
      caption: "Dept. of Electronics",
      role: "faculty",
    },
    postedAgo: "6d ago",
  },
  {
    id: 10,
    kind: "job",
    title: "Site Reliability Engineer",
    meta: "CRED · Bengaluru · ₹22–26L",
    description:
      "On-call, observability, and keeping the billing stack up. Linux, Kubernetes, and a calm head during incidents.",
    poster: {
      initials: "AP",
      name: "Arjun P.",
      caption: "Alumnus, Class of 2020",
      role: "alumni",
    },
    postedAgo: "1w ago",
  },
  {
    id: 11,
    kind: "job",
    title: "Mechanical Design Engineer",
    meta: "Tata Motors · Pune · ₹10–14L",
    description:
      "Chassis and BIW design. CATIA / SolidWorks and a decent grasp of GD&T. Core mechanical students preferred.",
    poster: {
      initials: "SL",
      name: "Sneha L.",
      caption: "Alumna, Class of 2018",
      role: "alumni",
    },
    postedAgo: "2w ago",
  },
  {
    id: 12,
    kind: "research",
    title: "CFD for Small Wind Turbines",
    meta: "Dept. of Mechanical Engg. · Funded project",
    description:
      "OpenFOAM or ANSYS Fluent experience helps. Six-month project with a conference paper as the goal. Stipend ₹28k.",
    poster: {
      initials: "KB",
      name: "Prof. K. Bala",
      caption: "Dept. of Mechanical Engg.",
      role: "faculty",
    },
    postedAgo: "4d ago",
  },
  {
    id: 13,
    kind: "job",
    title: "Embedded Systems Engineer",
    meta: "Bosch · Bengaluru · ₹12–16L",
    description:
      "Automotive firmware. C, RTOS, and some CAN bus. I can intro you to the hiring manager if your projects look solid.",
    poster: {
      initials: "VT",
      name: "Vivek T.",
      caption: "Alumnus, Class of 2019",
      role: "alumni",
    },
    postedAgo: "3d ago",
  },
  {
    id: 14,
    kind: "job",
    title: "Business Analyst",
    meta: "McKinsey · Mumbai · ₹18–22L",
    description:
      "Problem-solving interviews more than a specific major. If you want a mock case, message me — I run a few every season.",
    poster: {
      initials: "PN",
      name: "Priya N.",
      caption: "Alumna, Class of 2022",
      role: "alumni",
    },
    postedAgo: "8d ago",
  },
  {
    id: 15,
    kind: "research",
    title: "Privacy-Preserving Federated Learning",
    meta: "Dept. of Computer Science · Funded project",
    description:
      "Need a student who has taken ML and is willing to read papers. PyTorch preferred. RA for the rest of the academic year.",
    poster: {
      initials: "LS",
      name: "Prof. L. Sharma",
      caption: "Dept. of Computer Science",
      role: "faculty",
    },
    postedAgo: "3d ago",
  },
  {
    id: 16,
    kind: "job",
    title: "Cloud Engineer",
    meta: "Google · Hyderabad · ₹32–38L",
    description:
      "GCP infrastructure team. Systems background helps more than a cloud cert. Two referrals left for this campus cycle.",
    poster: {
      initials: "AR",
      name: "Aditya R.",
      caption: "Alumnus, Class of 2017",
      role: "alumni",
    },
    postedAgo: "5d ago",
  },
  {
    id: 17,
    kind: "job",
    title: "UX Designer",
    meta: "Swiggy · Bengaluru · ₹16–20L",
    description:
      "Consumer app squad. Portfolio should show shipped work, not just case-study restyles. Open to 2026 grads.",
    poster: {
      initials: "NC",
      name: "Nisha C.",
      caption: "Alumna, Class of 2021",
      role: "alumni",
    },
    postedAgo: "4d ago",
  },
  {
    id: 18,
    kind: "job",
    title: "Quant Analyst",
    meta: "JP Morgan · Mumbai · ₹28–35L",
    description:
      "Markets desk. Probability, coding in Python, and comfort with messy data. I can share last year's interview notes.",
    poster: {
      initials: "VS",
      name: "Varun S.",
      caption: "Alumnus, Class of 2018",
      role: "alumni",
    },
    postedAgo: "9d ago",
  },
  {
    id: 19,
    kind: "job",
    title: "DevOps Engineer",
    meta: "Atlassian · Bengaluru · ₹30–36L",
    description:
      "CI/CD and developer platform. Terraform and Kubernetes day to day. Ping me with a short note on a system you have run.",
    poster: {
      initials: "HB",
      name: "Harini B.",
      caption: "Alumna, Class of 2020",
      role: "alumni",
    },
    postedAgo: "1w ago",
  },
  {
    id: 20,
    kind: "job",
    title: "Hardware Engineer",
    meta: "Qualcomm · Hyderabad · ₹22–26L",
    description:
      "Modem and digital design. Verilog, timing, and a computer-architecture course. ECE and CSE both considered.",
    poster: {
      initials: "MG",
      name: "Mohit G.",
      caption: "Alumnus, Class of 2019",
      role: "alumni",
    },
    postedAgo: "3d ago",
  },
];
