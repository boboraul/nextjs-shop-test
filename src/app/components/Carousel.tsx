"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductBox from "../components/ProductBox";
import { products } from "@wix/stores";

type CarouselProps = {
  products?: any;
  carouselTitle?: string;
 
};

export default function Carousel({ carouselTitle, products} : CarouselProps) {
   const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  return (
    <section className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div className="text-2xl px-2">{carouselTitle}</div>
         {products.length > 4 && (
          <div className="controls flex gap-2 px-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="h-9 w-9 rounded-full text-xl bg-primary-500 text-white"
              aria-label="Previous products"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={scrollNext}
              className="h-9 w-9 rounded-full text-xl bg-primary-500 text-white"
              aria-label="Next products"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Viewport Embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container / Track */}
       <div className="flex">
          {products
            ?.filter(
              (product: products.Product) =>
                product.stock?.inventoryStatus !== "OUT_OF_STOCK"
            )
            .map((product: products.Product) => (
              <div
                key={product._id}
                className="min-w-0 px-2 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
              >
                <ProductBox
                  id={product._id!}
                  slug={product.slug!}
                  name={product.name!}
                  price={product.price?.price!}
                  discountedPrice={product.price?.discountedPrice!}
                  imageUrl={product.media?.mainMedia?.image?.url || "/product.png"}
                  currency={product.price?.currency}
                  secondaryImageUrl={
                    product.media?.items
                      ? product.media?.items[1]?.image?.url
                      : "/product.png"
                  }
                  shortDescHtml={product.additionalInfoSections}
                  discountPercent={
                    product.discount?.type === "PERCENT"
                      ? product.discount.value
                      : null
                  }
                  customClasses={"w-full"}
                  availability={product.stock?.inventoryStatus}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}