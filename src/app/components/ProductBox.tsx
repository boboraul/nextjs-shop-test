"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import SafeHtml from "./SafeHtml";
import Link from "next/link";

export type ProductBoxProps = {
  id: string;
  slug: string;
  name: string;
  price?: any;
  imageUrl: string;
  secondaryImageUrl?: string;
  shortDescHtml?: any | "";
  currency?: string;
};

export default function ProductBox({
  id,
  slug,
  name,
  price,
  imageUrl,
  secondaryImageUrl,
  shortDescHtml,
  currency,
}: ProductBoxProps) {
  return (
    <Link
      href={"/" + slug}
      className="w-full flex-col gap-10 sm:w-[40%] lg:w-[22%]"
    >
      <div className="w-full h-80 relative">
        {/* <svg
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
                        </svg> */}
        <Image
          src={imageUrl || "/product.png"}
          alt=""
          fill
          sizes="25vw"
          className="absolute object-cover object-top rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
        />
        {secondaryImageUrl && (
          <Image
            src={secondaryImageUrl}
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between mt-2">
        <span className="font-medium">{name}</span>
        <span>
          {price} {currency ? currency : ""}
        </span>
      </div>
      {shortDescHtml && (
        <SafeHtml
          html={
            shortDescHtml.find((section: any) => section.title === "shortDesc")
              ?.description
          }
        />
      )}

      <button className="rounded-2xl mt-4 ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200">
        Add to Cart
      </button>
    </Link>
  );
}
