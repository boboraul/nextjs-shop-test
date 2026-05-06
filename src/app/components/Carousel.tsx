"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductBox from "./components/ProductBox";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number | null;
  discountedPrice: number | null;
  imageurl: string;
  secondaryImageUrl: string;
  shortDescHtml: any;
  currency: string | null;
  discountPercent: number | null;
};

type CarouselProps = {
  // products: Product[];
  carouselTitle?: string;
};

export default function Carousel({ carouselTitle } : CarouselProps) {
   const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
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
          {products.map((product) => (
            /* Slide */
            <div
              key={product._id}
              className="min-w-0 flex-[0_0_33.333%] px-2"
            >
              <ProductBox product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}