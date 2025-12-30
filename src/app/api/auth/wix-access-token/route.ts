import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";

export async function GET() {
  const session = await getSession();
  const accessToken = session.wixMemberTokens?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  // Returnam doar accessToken (scurt-lived), nu refreshToken
  return NextResponse.json({ loggedIn: true, accessToken });
}