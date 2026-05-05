"use client";

import useEmblaCarousel from "embla-carousel-react";

export default function RecommendedCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recommended for you</h2>

        <div className="flex gap-2">
          <button type="button">‹</button>
          <button type="button">›</button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <div className="min-w-0 flex-[0_0_33.333%] px-2">
            <div className="border p-4">Product 1</div>
          </div>

          <div className="min-w-0 flex-[0_0_33.333%] px-2">
            <div className="border p-4">Product 2</div>
          </div>

          <div className="min-w-0 flex-[0_0_33.333%] px-2">
            <div className="border p-4">Product 3</div>
          </div>
        </div>
      </div>
    </section>
  );
}