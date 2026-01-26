// "use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";
import Pagination from "./Pagination";
import SafeHtml from "./SafeHtml";
import ProductBox from "../components/ProductBox";

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
        : 0,
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
          : b.price.price - a.price.price,
      );
    }

    if (sortKey === "lastUpdated") {
      items.sort((a: any, b: any) =>
        sortType === "asc"
          ? new Date(a.lastUpdated).getTime() -
            new Date(b.lastUpdated).getTime()
          : new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime(),
      );
    }
  }

  console.log("items ", items[0]);

  return (
    <div className="flex mt-8 gap-x-8 gap-y-16 flex-wrap justify-between">
      {items.map((product: products.Product) => (
        <React.Fragment key={product._id}>
          <ProductBox
            id={product._id!}
            slug={product.slug!}
            name={product.name!}
            price={product.price?.formatted?.price}
            imageUrl={product.media?.mainMedia?.image?.url || "/product.png"}
            secondaryImageUrl={
              product.media?.items
                ? product.media?.items[1]?.image?.url
                : "/product.png"
            }
            shortDescHtml={product.additionalInfoSections}
          />
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
