import type { TpoRequest } from "../domain/types";

export type {
  RegistrationKind,
  RequestStatus,
  TpoQueue,
  TpoRequest,
} from "../domain/types";

export const tpoRequests: TpoRequest[] = [
  {
    id: "reg-co-1",
    queue: "registrations",
    kind: "company",
    title: "Razorpay",
    detail: "Campus recruiter account · Bengaluru · requested portal access",
    submittedOn: "18 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-co-2",
    queue: "registrations",
    kind: "company",
    title: "Bosch",
    detail: "Hardware hiring team · requested company login for slot booking",
    submittedOn: "17 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-st-1",
    queue: "registrations",
    kind: "student",
    title: "Ananya Krishnan",
    detail: "CS · Final year · institute ID 21CS1042",
    submittedOn: "19 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-st-2",
    queue: "registrations",
    kind: "student",
    title: "Karthik V.",
    detail: "ECE · Pre-final year · institute ID 22EC1188",
    submittedOn: "16 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-al-1",
    queue: "registrations",
    kind: "alumni",
    title: "Meera R.",
    detail: "Class of 2022 · Razorpay · referral posting access",
    submittedOn: "15 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-al-2",
    queue: "registrations",
    kind: "alumni",
    title: "Rohan M.",
    detail: "Class of 2019 · Flipkart · requested alumni login",
    submittedOn: "14 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-tpo-1",
    queue: "registrations",
    kind: "tpoCompany",
    title: "Qualcomm (TPO-added)",
    detail: "Entered by TPO admin for the Hyderabad hardware drive",
    submittedOn: "18 Aug 2026",
    status: "pending",
  },
  {
    id: "reg-tpo-2",
    queue: "registrations",
    kind: "tpoCompany",
    title: "L&T (TPO-added)",
    detail: "Core mechanical visit — company record created by TPO office",
    submittedOn: "12 Aug 2026",
    status: "pending",
  },
  {
    id: "fb-1",
    queue: "feedback",
    title: "Goldman Sachs · Technology Analyst",
    detail: "Student write-up: 4 rounds, DSA + system design + HR",
    submittedOn: "20 Aug 2026",
    status: "pending",
  },
  {
    id: "fb-2",
    queue: "feedback",
    title: "Deloitte India · Analyst",
    detail: "Student write-up: case round was the filter; GD dropped",
    submittedOn: "19 Aug 2026",
    status: "pending",
  },
  {
    id: "fb-3",
    queue: "feedback",
    title: "Amazon · SDE",
    detail: "Student write-up: LP in every round, two coding interviews",
    submittedOn: "18 Aug 2026",
    status: "pending",
  },
  {
    id: "op-1",
    queue: "opportunities",
    title: "SDE II — Backend · Razorpay",
    detail: "Full Time · ₹28–32L · 2–4 YOE · posted by alumni",
    submittedOn: "20 Aug 2026",
    status: "pending",
  },
  {
    id: "op-2",
    queue: "opportunities",
    title: "ML for Structural Health Monitoring",
    detail: "Research · Dept. of Civil Engineering · stipend ₹35k",
    submittedOn: "19 Aug 2026",
    status: "pending",
  },
  {
    id: "op-3",
    queue: "opportunities",
    title: "Product Analyst intern · Zoho",
    detail: "Internship · Chennai · referral from Karthik V.",
    submittedOn: "17 Aug 2026",
    status: "pending",
  },
  {
    id: "slot-1",
    queue: "slots",
    title: "Razorpay · 15 Dec, 10:00–13:00",
    detail: "6–8 students · SDE + Backend roles · campus drive booking",
    submittedOn: "21 Aug 2026",
    status: "pending",
  },
  {
    id: "slot-2",
    queue: "slots",
    title: "Microsoft IDC · 18 Dec, 14:00–17:00",
    detail: "SDE hiring · requested second slot after Dec 3 visit",
    submittedOn: "20 Aug 2026",
    status: "pending",
  },
  {
    id: "slot-3",
    queue: "slots",
    title: "Bosch · 9 Jan, 09:30–12:30",
    detail: "Mechanical design · CAD lab + panel · Pune team travelling",
    submittedOn: "16 Aug 2026",
    status: "pending",
  },
];

const SUBMITTED_REGISTRATIONS_KEY = "placementics.submittedRegistrations";

export function getSubmittedRegistrations(): TpoRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(SUBMITTED_REGISTRATIONS_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as TpoRequest[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSubmittedRegistration(request: TpoRequest) {
  if (typeof window === "undefined") {
    return;
  }

  const current = getSubmittedRegistrations();
  window.localStorage.setItem(
    SUBMITTED_REGISTRATIONS_KEY,
    JSON.stringify([request, ...current]),
  );
}
