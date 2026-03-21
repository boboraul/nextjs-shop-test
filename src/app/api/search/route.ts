import { QdrantClient } from "@qdrant/js-client-rest";
import { embed } from "../../lib/embed";

const COLLECTION = "products_768";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return Response.json({ results: [] });

  const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });

  const [vector] = await embed([q]);

  const hits = await client.search(COLLECTION, {
    vector,
    limit: 10,
    with_payload: true,
  });

  return Response.json({
    results: hits.map((h) => ({ score: h.score, payload: h.payload })),
  });
}