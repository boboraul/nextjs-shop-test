import { QdrantClient } from "@qdrant/js-client-rest";

const COLLECTION = "products";
const VECTOR_SIZE = 1536;

export async function POST() {
  const client = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
  });

  const zeroVec = Array.from({ length: VECTOR_SIZE }, () => 0);

  await client.upsert(COLLECTION, {
    wait: true,
    points: [
      {
        id: 1,
        vector: zeroVec,
        payload: {
          title: "iPhone 15",
          category: "telefoane",
          price: 4999,
          inStock: true,
          url: "/produse/iphone-15",
          image: "https://.../iphone15.jpg",
          
        },
      },
      {
        id: 2,
        vector: zeroVec,
        payload: {
          title: "Galaxy S24",
          category: "telefoane",
          price: 4599,
          inStock: true,
          url: "/produse/galaxy-s24",
          image: "https://.../galaxy-s24.jpg",
        },
      },
    ],
  });

  return Response.json({ ok: true });
}