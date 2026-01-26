import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { wixContactsClient } from "../../../lib/wixContactsClient";
import { wixDataClient } from "../../../lib/wixDataClient";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const required = ["WIX_API_KEY", "WIX_SITE_ID", "WIX_USERS_COLLECTION_ID"];
  const missing = required.filter((k) => !process.env[k]);

  if (missing.length) {
    return NextResponse.json(
      { error: "Missing env vars", missing },
      { status: 500 }
    );
  }

  const usersCollectionId = process.env.WIX_USERS_COLLECTION_ID!;

  // verifica daca exista deja user cu email
  const existing = await wixDataClient.data.items
    .query(usersCollectionId)
    .eq("email", email)
    .limit(1)
    .find();

  if (existing.items.length > 0) {
    return NextResponse.json({ error: "User exists" }, { status: 409 });
  }

  const userId = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(password, 10);
  const registeredAt = new Date().toISOString();

  // creeaza contact in Wix (CRM)
  let wixContactId: string | undefined;

  try {
    const contact = await wixContactsClient.contacts.createContact({
      emails: { items: [{ email }] },
      extendedFields: {
        ["custom.externalUserId"]: userId,
      } as any,
    } as any);

    // tipurile difera, pastram robust:
    wixContactId = (contact as any)?._id || (contact as any)?.contact?._id;
  } catch (e: any) {
    return NextResponse.json(
      { error: "Wix createContact failed", details: e?.message || String(e) },
      { status: 500 }
    );
  }

  // scrie userul in colectia Users
  try {
    await wixDataClient.data.items.insert(usersCollectionId, {
      userId,
      email,
      username: name,
      password: passwordHash,
      registeredAt,
      externalUserId: userId,
      wixContactId: wixContactId || null,
    } as any);
  } catch (e: any) {
    return NextResponse.json(
      { error: "Wix Data insert failed", details: e?.message || String(e) },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
