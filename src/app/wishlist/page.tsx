"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWishlistStore } from "../hooks/useWishlistStore";
import Link from "next/link";
import { useWixClient } from "../hooks/useWixClient";
import { link } from "fs";

const Wishlist = () => {
  const { isLoading, removeItem, items } = useWishlistStore();
  const wixClient = useWixClient();

  const handleRemove = (id: string) => {
    removeItem(wixClient, id);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative mt-4">
      {/* Campaign Banner */}
      <div className="bg-gradient-primary-500 px-4 flex flex-col lg:flex-row justify-between h-96 lg:h-64">
        <div className="w-full lg:w-2/3 flex py-6 lg:py-0 flex-col items-center justify-center gap-4">
          <h1 className="text-2xl lg:text-3xl text-white text-center lg:text-left font-semi-bold leading-[32px]">
            Step into summer with 25% off every
            <br /> warm-weather essential
          </h1>
          <button className="rounded-3xl bg-white w-max text-primary-500 py-3 px-5 text-sm">
            Buy now
          </button>
        </div>
        <div className="relative w-full h-64 lg:h-full lg:w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* Products */}
      <div className="flex mt-8 gap-x-8 gap-y-16 flex-wrap justify-between">
        {isLoading ? (
          "Loading..."
        ) : !items ? (
          <div className="empty text-center pt-2">
            <span>Wishlist is empty</span>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <Link
                href={`/${item.productUrl!}`}
                className="w-full flex-col gap-44 sm:w-[45%] lg:w-[22%]"
              >
                <div className="item w-full" key={item._id}>
                  {item.productImage && (
                    <Image
                      alt={item.productName ?? "Product image"}
                      width={400}
                      height={400}
                      src={wixMedia.getScaledToFillImageUrl(
                        item.productImage,
                        400,
                        400,
                        {}
                      )}
                      className="object-cover rounded-md"
                      key={item._id}
                    />
                  )}
                  <div className="w-full">
                    {/* Title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="name font-semibold">{item.productName}</h3>
                      <div className="price rounded-sm p-1">{item.price}</div>
                    </div>

                    <button className="rounded-2xl mt-4 ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200">
                      Add to Cart
                    </button>

                    {/* <div className="text-sm mt-1">
                    <button
                      onClick={() => handleRemove(item._id!)}
                      className="border-0 text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div> */}
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
