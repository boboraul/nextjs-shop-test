

import { NextResponse } from "next/server";
import { wixDataClient } from "../../../lib/wixDataClient";
import { cookies } from "next/headers"
import { verifySession } from "../../../lib/auth";

export const runtime = "nodejs";

const wishlistCollectionId = process.env.WIX_WISHLIST_COLLECTION_ID!;

// Get current User
async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) return null;
    const payload = verifySession(token);
    return payload; // { id, email, name, ... }
}

//Delete item from Wishlist
export async function DELETE(_req: Request,{ params }: { params: { id: string } }) {
    const user = await getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

     if (!wishlistCollectionId) {
        return NextResponse.json(
            { error: "Missing WIX_WISHLIST_COLLECTION_ID" },
            { status: 500 }
        );
    }

    const itemId = params.id;

    const item = await wixDataClient.data.items.get(wishlistCollectionId, itemId);
    const ownerUserId = (item as any)?.userId;

    if (ownerUserId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await wixDataClient.data.items.remove(wishlistCollectionId, itemId);

    return NextResponse.json({ ok: true });
}