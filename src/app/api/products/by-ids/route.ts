import { wixReindexClient } from "../../../lib/wixReindexClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || !ids.length) {
      return NextResponse.json({ products: [] });
    }

    const res = await wixReindexClient.products.queryProducts().find();
    const products = res.items ?? [];


    const productMap = new Map(
    products.map((p) => [String(p._id), p])
  );

    const matchedProducts = ids.map((id: string) => productMap.get(id)).filter(Boolean);

    return NextResponse.json({
      products: matchedProducts.map((mp: any) => ({
        id: String(mp._id),
        slug: mp.slug ?? "",
        name: mp.name ?? "",
        price: mp.price?.price ?? null,
        discountedPrice: mp.price?.discountedPrice ?? null,
        image: mp.media?.mainMedia?.image?.url || "/product.png",
        secondaryImageUrl: mp.media?.items?.[1]?.image?.url || "/product.png",
        shortDescHtml: mp.additionalInfoSections ?? null,
        currency: mp.price?.currency ?? null,
        discountPercent:
          mp.discount?.type === "PERCENT" ? mp.discount.value : null,
      })),
    });
  } catch (error) {
    console.error("BY_IDS_ERROR", error);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}