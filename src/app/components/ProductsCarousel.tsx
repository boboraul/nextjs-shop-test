import Carousel from "./Carousel";
import { wixClientServer } from "../lib/wixClientServer";

type ProductsCarouselProps = {
  carouselTitle?: string;
  limit?: number;
  categoryId?: string;
  sortKey?: string;
  productId?: string;
};

export default async function ProductsCarousel({ carouselTitle, limit, categoryId, sortKey, productId } : ProductsCarouselProps) {
  const wixClient = await wixClientServer();
  const CAROUSEL_PRODUCTS_LIMIT = 20;

  let query = wixClient.products.queryProducts();

  if (categoryId) {
    query = query.eq("collectionIds", categoryId);
  }

  const res = await query.limit(limit || CAROUSEL_PRODUCTS_LIMIT).find();
  const items = [...res.items];

  if (sortKey) {
    if (sortKey === "lastUpdated") {
      items.sort((a: any, b: any) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
      );
    }
  }
  

  const filteredProducts = items.filter((product) => {
    return product.visible !== false && product._id !== productId
  });

  if (!filteredProducts.length) {
    return null;
  }

  return (
    <Carousel
      carouselTitle={carouselTitle}
      products={filteredProducts}
    />
  );
}