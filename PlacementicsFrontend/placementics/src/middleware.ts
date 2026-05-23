import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/src/lib/auth/session";

const publicStudentPaths = ["/student/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/student")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  const isPublicPath = publicStudentPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (session.isLoggedIn && pathname.startsWith("/student/login")) {
    return NextResponse.redirect(new URL("/student/mainpage", request.url));
  }

  if (!session.isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/student/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/student/:path*"],
};
