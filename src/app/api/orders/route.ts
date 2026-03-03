import { NextResponse } from "next/server";
import { z } from "zod";
import { wixDataClient } from "../../lib/wixDataClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const ordersCollectionId = process.env.WIX_ORDERS_COLLECTION_ID!;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OrderSchema = z.object({
  items: z.object({
      productId: z.string().min(1),
      variantId: z.string().optional(),
      qty: z.number().int().positive().max(50),
      productName: z.string().min(1),
      price: z.string().min(1),
      currency: z.string().min(1)  
  }),
   
  shipping: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    country: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
    postalCode: z.string().min(1)
  }),
  totalPrice: z.number().positive(),
  paymentMethod: z.enum(["card", "cash_on_delivery"]),
  shippingMethod: z.enum(["courier", "personalPickup"]),
  
});

function getUserIdFromSessionToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET!) as {
      id: string;
    };

    return decoded.id;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  const userId = token ? getUserIdFromSessionToken(token) : null;

  try {
    const body = await req.json();
    const parsed = OrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid Order payload", issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const now = new Date();

    const orderToInsert = {
    ...parsed.data,
    ...(userId ? { userId } : {}),
    userType: userId ? 'member' : 'guest',
    status: 'pending',
    
    date: now, // field key din colectie
    time: now, // field key din colectie
    };

    const inserted = await wixDataClient.data.items.insert(
      ordersCollectionId,
      orderToInsert
    );

    const item = inserted.item ?? inserted;
    const orderId = item._id;

    await wixDataClient.data.items.update(ordersCollectionId, {
      ...item, orderId
    })

    return NextResponse.json({ orderId: inserted.item?._id ?? inserted._id });
  } catch (err) {
    console.error("ORDER API ERROR:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

}
