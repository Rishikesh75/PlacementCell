export type RequestStatus = "pending" | "approved" | "rejected";

export type RegistrationKind =
  | "company"
  | "student"
  | "alumni"
  | "teacher"
  | "tpoCompany";

export type TpoQueue =
  | "registrations"
  | "feedback"
  | "opportunities"
  | "slots";

export interface TpoRequest {
  id: string;
  queue: TpoQueue;
  kind?: RegistrationKind;
  title: string;
  detail: string;
  submittedOn: string;
  status: RequestStatus;
}

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
