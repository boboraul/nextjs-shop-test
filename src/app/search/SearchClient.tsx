"use client";

import Image from "next/image";
import ProductBox from "../components/ProductBox";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SearchHit = {
  id: string;
};

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
  availability: string | null;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() || "";

  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setItems([]);
      return;
    }

    const run = async () => {
      setLoading(true);

      try {
        const searchRes = await fetch(`/api/search?q=${encodeURIComponent(q)}`);

        const searchData = await searchRes.json();
        console.log("searchData: ", searchData.results);

        const ids = (searchData.results || []).map(
          (item: SearchHit) => item.id,
        );

        // console.log("ids: ", ids);

        if (!ids.length) {
          setItems([]);
          return;
        }

        const productsRes = await fetch("/api/products/by-ids", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids }),
        });

        const productsData = await productsRes.json();
        setItems(productsData.products || []);

      } catch (err) {
        console.log(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [q]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative mt-4">
      {/* Search Banner */}
      <div className="relative w-full h-64">
        <Image src="/city.png" alt="search" fill className="object-contain" />
      </div>

      <div className="text-center results-text">
        <h1 className="py-10 text-xl">
          Semantic search results for: <span className="font-bold">{q}</span>
        </h1>
      </div>

      {/* Products */}
      <div className="flex mt-8 gap-x-4 gap-y-12 flex-wrap justify-between">
        {!loading &&
          (items.length == 0 ? (
            <div className="empty text-center mt-10 w-full">
              <span className="text-xl font-semibold">No results...</span>
            </div>
          ) : (
            <>
              {items.map((item: any) => (
                <ProductBox
                  key={item.id}
                  id={item.Id}
                  slug={item.slug!}
                  name={item.name!}
                  price={item.price!}
                  discountedPrice={item.discountedPrice!}
                  imageUrl={item.image!}
                  secondaryImageUrl={item.secondaryImageUrl!}
                  shortDescHtml={""}
                  currency={item.currency}
                  availability={item.availability!}
                  discountPercent={item.discountPercent}
                  customClasses={"w-full sm:w-[48%] lg:w-[23%]"}
                />
              ))}
            </>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
