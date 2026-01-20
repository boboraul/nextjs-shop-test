import { NextResponse } from "next/server";
import crypto from "crypto";
import { readUsers, writeUsers } from "../../../lib/db";
import { wixContactsClient } from "../../../lib/wixContactsClient";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const users = readUsers();
  const exists = users.find((u) => u.email === email);

  if (exists) {
    return NextResponse.json({ error: "User exists" }, { status: 409 });
  }

  const userId = crypto.randomUUID();

    const capitalizeName = (value: string) => {
      return value
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
  };

  const formattedName = capitalizeName(name);

  const newUser = {
    id: userId,
    name: formattedName,
    email,
    password: passwordHash,
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
