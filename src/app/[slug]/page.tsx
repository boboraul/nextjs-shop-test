// "use client";

import { notFound } from "next/navigation";
import ProductImages from "../components/ProductImages";
import CustomizeProducts from "../components/CustomizeProducts";
import Add from "../components/Add";
import { wixClientServer } from "../lib/wixClientServer";
import SafeHtml from "../components/SafeHtml";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .find();

  if (!products.items[0]) {
    notFound();
  }

  const product = products.items[0];
  console.log(product.additionalInfoSections);
  const discountPercent =
    product.discount?.type === "PERCENT" ? product.discount.value! : null;
  const gCurrency =
    product.price?.currency == "RON" ? "Lei" : product.price?.currency;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative flex flex-col lg:flex-row lg:items-start gap-8 mt-8 lg:mt-12">
      <div className="w-full lg:w-1/2 h-max relative">
        {discountPercent && (
          <div className="promo-badge bg-danger-500 w-[70px] flex rotate-[9deg] items-center px-2 opacity-80 rounded-tr-3xl leading-[26px] justify-center rounded-bl-3xl left-0 text-white absolute text-[20px] z-[999]">
            <span className="text-white absolute top-[-15px] left-px">.</span>
            {discountPercent}%
          </div>
        )}

        <ProductImages items={product.media?.items} />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>

        <SafeHtml html={product.description!} classes="text-gray-500" />

        <div className="price-box">
          {product.price?.price === product.price?.discountedPrice ? (
            <h2 className="text-2xl text-primary-500 font-medium">
              {product.price?.formatted?.discountedPrice?.replace("lei", " ")}
              {gCurrency}
            </h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                {product.price?.formatted?.price?.replace("lei", " ")}
                {gCurrency}
              </h3>
              <h2 className="font-medium text-2xl text-primary-500">
                {product.price?.formatted?.discountedPrice?.replace("lei", " ")}
                {gCurrency}
              </h2>
            </div>
          )}
        </div>

        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
            productName={product.name!}
            productImage={product.media?.mainMedia?.image?.url!}
            price={product.price?.price!}
            discountedPrice={product.price?.discountedPrice!}
            currency={gCurrency}
            productUrl={product.slug}
            discountPercent={discountPercent}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="0000-00000-0000"
            stockNumber={product.stock?.quantity || 0}
            productName={product.name!}
            productImage={product.media?.mainMedia?.image?.url!}
            price={
              product.price?.price! > product.price?.discountedPrice!
                ? product.price?.discountedPrice!
                : product.price?.price!
            }
            discountedPrice={product.price?.discountedPrice!}
            currency={gCurrency}
            productUrl={product.slug}
            discountPercent={discountPercent}
          />
        )}
      </div>
    </div>
  );
}
