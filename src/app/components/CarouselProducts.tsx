import Carousel from "./Carousel";
import { wixClientServer } from "../lib/wixClientServer";

type CarouselProductsProps = {
  carouselTitle?: string;
  limit?: number;
  categoryId?: string;
  latestProducts?: number;
};

export default async function CarouselProducts({ carouselTitle, limit, categoryId, latestProducts } : CarouselProductsProps) {
  const wixClient = await wixClientServer();
  const CAROUSEL_PRODUCTS_LIMIT = 20;

  let query = wixClient.products.queryProducts();

  if (categoryId) {
    query = query.eq("collectionIds", categoryId);
  }

  const res = await query.limit(limit || CAROUSEL_PRODUCTS_LIMIT).find();

  const filteredProducts = res.items.filter((product) => {
    return product.visible !== false;
  });

  return (
    <Carousel
      carouselTitle={carouselTitle}
      products={filteredProducts}
    />
  );
}