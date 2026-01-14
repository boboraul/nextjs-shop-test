import { NextResponse } from "next/server";
import crypto from "crypto";
import { readUsers, writeUsers } from "../../../lib/db";
import { wixContactsClient } from "../../../lib/wixContactsClient";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const users = readUsers();
  const exists = users.find((u) => u.email === email);

  if (exists) {
    return NextResponse.json({ error: "User exists" }, { status: 409 });
  }

  const userId = crypto.randomUUID();

  const newUser = {
    id: userId,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  try {
  await wixContactsClient.contacts.createContact({
    emails: { items: [{ email }] },
    extendedFields: {
      ["custom.externalUserId"]: userId,
    } as any,
  } as any);
} catch (e: any) {
  return NextResponse.json(
    {
      error: "Wix createContact failed",
      details: e?.message || String(e),
    },
    { status: 500 }
  );
}

  return NextResponse.json({ ok: true });
}
