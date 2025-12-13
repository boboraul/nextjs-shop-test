// "use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";
import Pagination from "./Pagination";
import SafeHtml from "./SafeHtml";

const PRODUCT_PER_PAGE = 8;

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

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );
  // .find();
  // console.log(" first PRODUCT!!!!! " + res.items);
  const res = await productQuery.find();

  const items = [...res.items];

  if (searchParams?.sort) {
    const [sortType, sortKey] = searchParams.sort.split(" ");

    if (sortKey === "price") {
      items.sort((a: any, b: any) =>
        sortType === "asc"
          ? a.price.price - b.price.price
          : b.price.price - a.price.price
      );
    }

    if (sortKey === "lastUpdated") {
      items.sort((a: any, b: any) =>
        sortType === "asc"
          ? new Date(a.lastUpdated).getTime() -
            new Date(b.lastUpdated).getTime()
          : new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
      );
    }
  }

  return (
    <div className="flex mt-8 gap-x-8 gap-y-16 flex-wrap justify-between">
      {items.map((product: products.Product) => (
        <React.Fragment key={product._id}>
          <Link
            href={"/" + product.slug}
            className="w-full flex-col gap-44 sm:w-[45%] lg:w-[22%]"
          >
            <div className="w-full h-80 relative">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover object-top rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium">{product.name}</span>
              <span>{product.price?.formatted?.price}</span>
            </div>

            <SafeHtml
              html={
                product.additionalInfoSections?.find(
                  (section: any) => section.title === "shortDesc"
                )?.description
              }
            />

            <button className="rounded-2xl mt-4 ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200">
              Add to Cart
            </button>
          </Link>
        </React.Fragment>
      ))}
      {searchParams && (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      )}
    </div>
  );
};

export default ProductList;
