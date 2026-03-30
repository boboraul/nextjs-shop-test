import { wixReindexClient } from "../../../lib/wixReindexClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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
            price: p.price?.price ?? null ?? null
            discountedPrice: p.price?.discountedPrice!,
            imageUrl: p.media?.mainMedia?.image?.url || "/product.png",
            secondaryImageUrl: p.media?.items?.[1]?.image?.url || "/product.png",
            shortDesc: p.additionalInfoSections ?? null,
            currency: p.price?.currency ?? null,
            discountPercent: p.discount?.type === "PERCENT"
                ? p.discount.value
                : null,
        })
    });

}