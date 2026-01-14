import { NextResponse } from "next/server";
import { readUsers } from "../../../lib/db";
import { signSession } from "../../../lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession({ id: user.id, email: user.email });

  const res = NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email },
  });

  res.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
