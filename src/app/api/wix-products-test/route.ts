import { wixDataClient } from "../../lib/wixDataClient";

export async function GET() {
  const res = await wixDataClient.products.queryProducts().limit(5).find();

  const items = (res.items ?? []).map((p: any) => ({
    id: p._id,
    name: p.name,
    slug: p.slug,
    price: p.priceData?.price,
    image:
      p.media?.mainMedia?.image?.url ||
      p.media?.items?.[0]?.image?.url ||
      null,
  }));
   return Response.json({ ok: true });

}