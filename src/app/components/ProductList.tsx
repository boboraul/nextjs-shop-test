// "use client";

import React from "react";
import { wixClientServer } from "../lib/wixClientServer";
import { products } from "@wix/stores";
import Pagination from "./Pagination";

import ProductBox from "../components/ProductBox";

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
  const PRODUCT_PER_PAGE = 8;
  const perPage = limit || PRODUCT_PER_PAGE;

  const sp = (await searchParams) ?? {};
  const currentPage = sp.page ? Number(sp.page) : 1;

  const catProducts = wixClient.products.queryProducts().eq("collectionIds", categoryId);
  const resProd = await catProducts.find();
  const resProdArr = [...resProd.items].length;
  const totalPages = Math.ceil(resProdArr / perPage);

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", sp?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [sp?.type || "physical", "digital"])
    .gt("priceData.price", sp?.min || 0)
    .lt("priceData.price", sp?.max || 999999)
    .limit(perPage)
    .skip((currentPage - 1) * perPage);
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
            availability={product.stock?.inventoryStatus}
          />
        </React.Fragment>
      ))}
      {searchParams && (
        <Pagination
          currentPage={res.currentPage! + 1 || 1}
          totalPages={totalPages}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      )}
    </div>
  );
};

export default ProductList;
