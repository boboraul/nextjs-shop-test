import { QdrantClient } from "@qdrant/js-client-rest";

const COLLECTION = "products";

export async function GET() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });

  const res = await client.scroll(COLLECTION, { limit: 20, with_payload: true });
  return Response.json(res);
}