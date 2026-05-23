import { NextResponse } from "next/server";
import { destroySession } from "@/src/lib/auth/get-session";

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true });
}
