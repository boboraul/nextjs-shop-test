import Carousel from "./Carousel";
import { QdrantClient } from "@qdrant/js-client-rest";
import { wixClientServer } from "../lib/wixClientServer";


const COLLECTION = "products_768";

const client = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

async function getRelatedProductIds(
  productId: string,
  limit: number,
): Promise<string[]> {
  const point = await client.retrieve(COLLECTION, {
    ids: [productId],
    with_vector: true,
  });

  if (!point.length || !point[0].vector) {
    return [];
  }

  const vector = point[0].vector as number[];

  const hits = await client.search(COLLECTION, {
    vector,
    limit: limit +1,
    with_payload: true,
  });


  const relatedIds = hits
  .filter((hit) => hit.id !== productId && hit.score > 0.7)
  .map((hit) => String(hit.payload?.id))
  .filter(Boolean)
  .slice(0, limit);

  return relatedIds;
}

type QdrantProductsCarouselProps = {
  productId: string;
  carouselTitle?: string;
  limit?: number;
};

export default async function QdrantProductsCarousel ({
  productId,
  carouselTitle,
  limit = 10,
}: QdrantProductsCarouselProps) {
    const wixClient = await wixClientServer();
    
    const ids = await getRelatedProductIds(productId, limit);

    const res = await wixClient.products
    .queryProducts()
    .hasSome("_id", ids)
    .find();

    const items = res.items;

    if (!items.length) {
      return null;
    }
  
   return (
      <Carousel
        carouselTitle={carouselTitle}
        products={items}
      />
    );
}