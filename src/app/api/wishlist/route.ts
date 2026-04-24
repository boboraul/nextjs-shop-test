
import { NextResponse } from "next/server";
import { wixDataClient } from "../../lib/wixDataClient";
import { cookies } from "next/headers"
import { verifySession } from "../../lib/auth";

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

// Fetch user`s Wishlist
export async function GET() {
    const user = await getUser();

    if (!user) {
        return NextResponse.json({ items: [] }, { status: 200 });
    }

    if (!wishlistCollectionId) {
        return NextResponse.json(
            { error: "Missing WIX_WISHLIST_COLLECTION_ID" },
            { status: 500 }
        );
    }

    const result = await wixDataClient.data.items
    .query(wishlistCollectionId)
    .eq("userId", user.id)
    .find();

    return NextResponse.json({
        userId: user.id,
        items: result.items ?? [],
    });

}

// Insert Item in Wishlist
export async function POST(req: Request) {
    const user = await getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized, you must have an account to add product to wishlist!" }, { status: 401 });
    }

    if (!wishlistCollectionId) {
            return NextResponse.json(
            { error: "Missing WIX_WISHLIST_COLLECTION_ID" },
            { status: 500 }
        );
    }

    const body = await req.json();

    const itemToInsert = {
        ...body,
        userId: user.id,
        createdAt: new Date().toISOString(),
    };

    const inserted = await wixDataClient.data.items.insert(
        wishlistCollectionId,
        itemToInsert as any
    );

     return NextResponse.json({ ok: true, item: inserted });

}