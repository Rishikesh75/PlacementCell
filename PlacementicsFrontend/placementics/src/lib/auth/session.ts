import type { SessionOptions } from "iron-session";

export interface SessionData {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "placementics_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  },
};

export const SESSION_COOKIE = "placementics_session";
