import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "../../../lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  const payload = verifySession(token);
  if (!payload) {
    return NextResponse.json({ loggedIn: false });
  }

  function capitalize(name: string) {
    const s = name.trim();
    if (!s) return s;
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }

  const formattedName = capitalize(payload.name);

  return NextResponse.json({
    loggedIn: true,
    user: { id: payload.id, email: payload.email, name: formattedName },
  });
}
