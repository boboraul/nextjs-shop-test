// "use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { wixClientServer } from "../lib/wixClientServer";
import DOMPurify from "isomorphic-dompurify";

const PRODUCT_PER_PAGE = 20;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();
  // console.log(" first PRODUCT!!!!! " + res.items);

  return (
    <div className="flex mt-8 gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: any) => (
        <>
          <Link
            key={product._id}
            href={"/" + product.slug}
            className="w-full flex-col gap-44 sm:w-[45%] lg:w-[22%]"
          >
            <div className="w-full h-80 relative">
              <Image
                src={product.media?.mainMedia.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover object-top rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              <Image
                src={product.media?.items[1]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover object-top rounded-md"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium">{product.name}</span>
              <span>${product.price.price}</span>
            </div>
            <div
              className="text-sm h-4 text-gray-500 mt-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
            <button className="rounded-2xl mt-4 ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200">
              Add to Cart
            </button>
          </Link>
        </>
      ))}
    </div>
  );
};

export default ProductList;
