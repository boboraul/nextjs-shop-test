import { QdrantClient } from "@qdrant/js-client-rest";
import { embed } from "../../lib/embed";

const COLLECTION = "products_768";

export async function POST() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });

  const products = [
    {
      id: 1,
      title: "iPhone 15",
     
      category: "telefoane",
      price: 4999,
      inStock: true,
      url: "/produse/iphone-15",
      image: "https://.../iphone15.jpg",
    },
    {
      id: 2,
      title: "Galaxy S24",
      
      category: "telefoane",
      price: 4599,
      inStock: true,
      url: "/produse/galaxy-s24",
      image: "https://.../galaxy-s24.jpg",
      
    },
  ];

  const texts = products.map(
    (p) => `${p.title}. Categorie: ${p.category}.`
  );

  const vectors = await embed(texts);

  await client.upsert(COLLECTION, {
    wait: true,
    points: products.map((p, i) => ({
      id: p.id,
      vector: vectors[i],
      payload: p,
    })),
  });

  return Response.json({ ok: true, count: products.length });
}