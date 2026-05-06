"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductBox from "../components/ProductBox";


type CarouselProps = {
  products?: any;
  carouselTitle?: string;
};

export default function Carousel({ carouselTitle, products } : CarouselProps) {
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
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{carouselTitle}</h3>

        <div className="flex gap-2">
           <button
            type="button"
            onClick={scrollPrev}
            className="h-9 w-9 rounded-full border"
            aria-label="Previous products"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={scrollNext}
            className="h-9 w-9 rounded-full border"
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </div>

      {/* Viewport Embla */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container / Track */}
        <div className="flex">
         {products.map((product: products.Product) => (
            /* Slide */
            <div
              key={product._id}
              className="min-w-0 flex-[0_0_33.333%] px-2">
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
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}