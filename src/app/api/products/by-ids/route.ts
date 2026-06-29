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

    const productMap = new Map<string, any>();

    products.forEach((product: any) => {
      productMap.set(String(product._id), product);
    });

    const matchedProducts: any[] = ids
      .map((id: string) => productMap.get(id))
      .filter((item: any) => !!item);

    return NextResponse.json({
      products: matchedProducts.map((product: any) => ({
        id: String(product._id),
        slug: product.slug ?? "",
        name: product.name ?? "",
        price: product.price?.price ?? null,
        discountedPrice: product.price?.discountedPrice ?? null,
        image: product.media?.mainMedia?.image?.url || "/product.png",
        secondaryImageUrl:
          product.media?.items?.[1]?.image?.url || "/product.png",
        shortDescHtml: product.additionalInfoSections ?? null,
        currency: product.price?.currency ?? null,
        discountPercent:
          product.discount?.type === "PERCENT"
            ? product.discount.value
            : null,
        availability: product.stock?.inventoryStatus ?? null,   
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