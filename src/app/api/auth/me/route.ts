import { NextResponse } from "next/server";
import { getSession } from "../../../lib/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSession();

    return NextResponse.json({
      loggedIn: Boolean(session?.user),
      user: session?.user ?? null,
    });
  } catch (e) {
    console.error("ME ERROR:", e);

    return NextResponse.json(
      { loggedIn: false, user: null },
      { status: 200 }
    );
  }
}

// export async function GET() { const session = await getSession(); return NextResponse.json({ loggedIn: Boolean(session.user), user: session.user ?? null, }); }
