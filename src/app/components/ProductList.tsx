// "use client";

import React from "react";
import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";
import Pagination from "./Pagination";

import ProductBox from "../components/ProductBox";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: Promise<any>;
}) => {
  const wixClient = await wixClientServer();
  const sp = (await searchParams) ?? {};

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", sp?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [sp?.type || "physical", "digital"])
    .gt("priceData.price", sp?.min || 0)
    .lt("priceData.price", sp?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(sp?.page ? parseInt(sp.page) * (limit || PRODUCT_PER_PAGE) : 0);
  // .find();

  const res = await productQuery.find();

  const items = [...res.items];

  if (sp?.sort) {
    const [sortType, sortKey] = sp.sort.split(" ");

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

  return (
    <div className="flex mt-8 gap-x-8 gap-y-16 flex-wrap justify-between">
      {items.map((product: products.Product) => (
        <React.Fragment key={product._id}>
          <ProductBox
            id={product._id!}
            slug={product.slug!}
            name={product.name!}
            price={product.price?.price!}
            discountedPrice={product.price?.discountedPrice!}
            imageUrl={product.media?.mainMedia?.image?.url || "/product.png"}
            currency={product.price?.currency}
            secondaryImageUrl={
              product.media?.items
                ? product.media?.items[1]?.image?.url
                : "/product.png"
            }
            shortDescHtml={product.additionalInfoSections}
            discountPercent={
              product.discount?.type === "PERCENT"
                ? product.discount.value
                : null
            }
          />
        </React.Fragment>
      ))}
      {searchParams && (
        <Pagination
          currentPage={res.currentPage}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      )}
    </div>
  );
};

export default ProductList;
