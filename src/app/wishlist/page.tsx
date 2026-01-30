"use client";

// import React, { Suspense } from "react";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWishlistStore } from "../hooks/useWishlistStore";
// import Link from "next/link";
// import { useWixClient } from "../hooks/useWixClient";
// import SafeHtml from "../components/SafeHtml";
import ProductBox from "../components/ProductBox";

const Wishlist = () => {
  const { isLoading, items } = useWishlistStore();

  console.log("wish items ", items);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative mt-4">
      {/* Wishlist Banner */}
      <div className="bg-gradient-primary-500 pr-4 flex flex-col lg:flex-row justify-between h-96 lg:h-64">
        <div className="relative w-full h-64 lg:h-full lg:w-1/3">
          <Image
            src="/wishlist-woman.png"
            alt="wishlist"
            fill
            className="object-contain"
          />
        </div>
        <div className="w-full lg:w-2/3 flex py-6 lg:py-0 flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-3xl text-white text-center lg:text-right font-semi-bold leading-[32px]">
            Save it now. Come back
            <br /> when you’re ready!
          </h1>
          <button className="rounded-3xl bg-white w-max text-primary-500 py-3 px-5 text-sm">
            Buy now
          </button>
        </div>
        
      </div>

      {/* Products */}
      <div className="flex mt-8 gap-x-8 gap-y-16 flex-wrap justify-between">
        {isLoading ? (
          "Loading..."
        ) : items.length < 1 ? (
          <div className="empty text-center pt-2">
            <span>Wishlist is empty</span>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <ProductBox
                key={item._id}
                id={item.productId}
                slug={item.productUrl!}
                name={item.productName!}
                price={item.price!}
                imageUrl={item.productImage!}
                shortDescHtml={""}
                currency={item.currency}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
