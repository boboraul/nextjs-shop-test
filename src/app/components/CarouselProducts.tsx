import Carousel from "./Carousel";
import { wixClientServer } from "../lib/wixClientServer";

type CarouselProductsProps = {
  carouselTitle?: string;
  limit?: number;
};

export default async function CarouselProducts({ carouselTitle, limit } : CarouselProductsProps) {
  const wixClient = await wixClientServer();
  const CAROUSEL_PRODUCTS_LIMIT = 20;
  const res = await wixClient.products.queryProducts().limit(limit || CAROUSEL_PRODUCTS_LIMIT).find();

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