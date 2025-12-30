import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";

export async function POST() {
  const session = await getSession();
  session.destroy(); // sterge app_session + wixMemberTokens + user

  return NextResponse.json({ ok: true });
}