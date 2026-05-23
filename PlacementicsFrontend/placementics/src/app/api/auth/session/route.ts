import { NextResponse } from "next/server";
import { getCurrentUser } from "@/src/lib/auth/get-session";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
