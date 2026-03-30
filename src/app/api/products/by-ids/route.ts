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

    const matchedProducts = products.filter((p) =>
      ids.includes(String(p._id))
    );

    return NextResponse.json({
      products: matchedProducts.map((p) => ({
        id: String(p._id),
        slug: p.slug ?? "",
        name: p.name ?? "",
        price: p.price?.price ?? null,
        discountedPrice: p.price?.discountedPrice ?? null,
        image: p.media?.mainMedia?.image?.url || "/product.png",
        secondaryImageUrl: p.media?.items?.[1]?.image?.url || "/product.png",
        shortDescHtml: p.additionalInfoSections ?? null,
        currency: p.price?.currency ?? null,
        discountPercent:
          p.discount?.type === "PERCENT" ? p.discount.value : null,
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