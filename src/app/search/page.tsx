"use client";

import Image from "next/image";
import ProductBox from "../components/ProductBox";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SearchHit = {
  id: string;
  score: number;
  name: string;
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
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() || "";
  const items = [] as any;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setProducts([]);
      return;
    }

    const run = async () => {
      setLoading(true);

      try {

        const searchRes = await fetch("/api/search?q=${encodeURIComponent(q)}");
        const searchData = await searchRes.json();

        const ids = (searchData.products || []).map((item: SearchHit) => items.id);

        if (!ids.length) {
          setProducts([]);
          return;
        }

        const productsRes = await fetch("/api/products/by-ids", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ ids })
          }
        });

        const productsData = await productRes.json();
        setProducts(productsData.products || []);

      } catch (err) {
        console.log(err)
        setProducts([]);
        
      } finally {
        setLoading(false)
      }
    }

    run();

  }, [q]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative mt-4">
      {/* Search Banner */}
      <div className="relative w-full h-64">
        <Image src="/city.png" alt="search" fill className="object-contain" />
      </div>

      {/* Products */}
      <div className="flex mt-8 gap-x-8 gap-y-16 flex-wrap justify-between">
        {items.length == 0 ? (
          <div className="empty text-center mt-20 w-full">
            <span className="text-xl font-semibold">No results</span>
          </div>
        ) : (
          <>
            {items.map((item: any) => (
              <ProductBox
                key={item._id}
                id={item.productId}
                slug={item.productUrl!}
                name={item.productName!}
                price={item.price!}
                discountedPrice={item.discountedPrice!}
                imageUrl={item.productImage!}
                shortDescHtml={""}
                currency={item.currency}
                discountPercent={item.discountPercent}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
