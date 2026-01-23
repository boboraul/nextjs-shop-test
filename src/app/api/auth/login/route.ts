import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signSession } from "../../../lib/auth";
import { wixDataClient } from "../../../lib/wixDataClient";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const usersCollectionId = process.env.WIX_USERS_COLLECTION_ID!;

  const result = await wixDataClient.data.items
    .query(usersCollectionId)
    .eq("email", email)
    .limit(1)
    .find();

  const user = result.items?.[0] as any;

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession({
    id: user.userId,
    email: user.email,
    name: user.username,
  });

  const res = NextResponse.json({
    ok: true,
    user: { id: user.userId, email: user.email, name: user.username },
  });

  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
