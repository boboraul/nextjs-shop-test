import { QdrantClient } from "@qdrant/js-client-rest";
import { embed } from "../../lib/embed";
import { wixReindexClient } from "../../lib/wixReindexClient";
import { NextResponse } from "next/server";

const COLLECTION = "products_768";

export async function POST() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });

  await client.deleteCollection(COLLECTION)

  await client.createCollection(COLLECTION, {
    vectors: {
      size: 768,
      distance: "Cosine",
    },
  })

  const res = await wixReindexClient.products.queryProducts().find()

  const products = res.items ?? [];
  
  if (!products.length) {
    return NextResponse.json({
      ok: false,
      message: 'No Wix products found',
    }, { status: 404 })
  }

  const texts = products.map((p) =>
    [
      p.name,
      p.slug,
      p.description,
    ]
      .filter(Boolean)
      .join(" ")
  )

  const vectors = await embed(texts);

  const points = products.map((p, i) => ({
    id: String(p._id),
    vector: vectors[i],
    payload: {
      id: p._id ?? "",
      name: p.name ?? "",
      slug: p.slug ?? "",
      description: p.description ?? "",
      image: p.media?.mainMedia?.image?.url ?? "",
      url: p.slug ? `/${p.slug}` : "",
    },
  }))

  await client.upsert(COLLECTION, {
    wait: true,
    points,
  })

  return Response.json({
    ok: true,
    count: points.length,
    sample: points.slice(0, 4).map((p) =>p.payload),
  })
}