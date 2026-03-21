import { QdrantClient } from "@qdrant/js-client-rest";

const COLLECTION = "products";
const VECTOR_SIZE = 1536;

export async function POST() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });

  // idempotent: dacă există deja, nu mai creează
  const existing = await client.getCollections();
  const already = existing.collections?.some((c) => c.name === COLLECTION);

  if (!already) {
    await client.createCollection(COLLECTION, {
      vectors: { size: VECTOR_SIZE, distance: "Cosine" },
    });
  }

  return Response.json({ ok: true, created: !already, collection: COLLECTION });
}