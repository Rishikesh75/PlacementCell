import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/src/lib/auth/session";
import { getStudentById } from "@/src/lib/api/students-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const username = body.username?.trim();
    const password = body.password?.trim();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    const student = await getStudentById(username);

    if (!student || student.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
      },
    });

    const session = await getIronSession<SessionData>(
      request,
      response,
      sessionOptions,
    );
    session.user = {
      id: student.id,
      name: student.name,
      email: student.email,
    };
    session.isLoggedIn = true;
    await session.save();

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}
