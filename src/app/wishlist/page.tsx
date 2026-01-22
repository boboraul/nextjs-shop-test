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
  console.log("wish items ", items);

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
      <div className="flex mt-8 gap-8 flex-wrap justify-between">
        {isLoading ? (
          "Loading..."
        ) : items.length < 1 ? (
          <div className="empty text-center pt-2">
            <span>Wishlist is empty</span>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div
                className="flex-col gap-25 w-[45%] lg:w-[22%] relative"
                key={item._id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-red-400 cursor-pointer absolute top-2 right-2"
                  onClick={() => handleRemove(item._id!)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>

                {item.productImage && (
                  <Link href={`/${item.productUrl!}`} className="">
                    <Image
                      alt={item.productName ?? "Product image"}
                      width={400}
                      height={400}
                      src={wixMedia.getScaledToFillImageUrl(
                        item.productImage,
                        247,
                        320,
                        {},
                      )}
                      className="object-cover rounded-md"
                    />
                  </Link>
                )}

                <div className="w-full">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="name font-semibold">{item.productName}</h3>
                    <div className="price rounded-sm p-1">
                      {item.price} {item.currency}
                    </div>
                  </div>

                  <button className="rounded-2xl mt-4 ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
