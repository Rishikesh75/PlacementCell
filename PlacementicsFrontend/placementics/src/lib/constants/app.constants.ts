/**
 * Application-wide constants
 */

export const APP_CONSTANTS = {
  API: {
    BASE_URL: process.env.API_BASE_URL ?? "https://localhost:7070/api",
    ENDPOINTS: {
      AUTH: "/auth",
      STUDENTS: "/Students",
      FEEDBACK_ON_COMPANY: "/feedbackoncompany",
    },
  },
  ROUTES: {
    ROOT: "",
    STUDENT: {
      LOGIN: "student/login",
      MAIN_PAGE: "student/mainpage",
      INTERVIEW_FEEDBACK: "student/interview-feedback",
      FEEDBACK_DISPLAY: "student/interview-feedback-display",
    },
  },
  FORM: {
    STEPS: [
      "Company Details",
      "Coding Round",
      "Technical Round",
      "HR Round",
      "Resources Used",
    ],
  },
  NOTIFICATION: {
    Duration: 3000,
    POSITION: {
      HORIZONTAL: "center",
      VERTICAL: "top",
    },
  },
} as const;
