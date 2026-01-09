import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";
import crypto from "crypto";

export async function POST(req: Request) {
  const { accessToken, refreshToken, email } = await req.json();

    if (!refreshToken || !accessToken) {
    return NextResponse.json(
        { ok: false, error: "missing_tokens" },
        { status: 400 }
    );
    }

  const session = await getSession();

  // Generam un ID stabil din email (hash)
  const userId = crypto
    .createHash("sha256")
    .update(email)
    .digest("hex");

  session.user = { 
    id: userId,
    email,
  };
  
  session.wixMemberTokens = { refreshToken, accessToken };
  await session.save();

  return NextResponse.json(
    { ok: true }
  ); 
}
