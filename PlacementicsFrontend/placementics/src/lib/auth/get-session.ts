import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import {
  defaultSession,
  sessionOptions,
  type SessionData,
} from "@/src/lib/auth/session";

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.user) {
    return null;
  }
  return session.user;
}

export async function destroySession() {
  const session = await getSession();
  session.user = undefined;
  session.isLoggedIn = false;
  await session.save();
}

export { defaultSession };
export type { SessionData };
