// "use client";

import { notFound } from "next/navigation";
import ProductImages from "../components/ProductImages";
import CustomizeProducts from "../components/CustomizeProducts";
import Add from "../components/Add";
import { wixClientServer } from "../lib/wixClientServer";

// export const dynamic = "force-dynamic";

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
  console.log("my product ", product);

  const price =
    product.price?.price === product.price?.discountedPrice
      ? product.price?.discountedPrice
      : product.price?.discountedPrice;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative flex flex-col lg:flex-row gap-16 mt-12">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="description text-gray-500">{product.description}</p>
        <div className="price-box">
          {product.price?.price === product.price?.discountedPrice ? (
            <h2 className="text-2xl text-primary-500 font-medium">
              {product.price?.discountedPrice} {product.price?.currency}
            </h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                {product.price?.price} {product.price?.currency}
              </h3>
              <h2 className="font-medium text-2xl text-primary-500">
                {product.price?.discountedPrice} {product.price?.currency}
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
            price={price}
            currency={product.price?.currency}
            productUrl={product.slug}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="0000-00000-0000"
            stockNumber={product.stock?.quantity || 0}
            productName={product.name!}
            productImage={product.media?.mainMedia?.image?.url!}
            price={price}
            currency={product.price?.currency}
            productUrl={product.slug}
          />
        )}
      </div>
    </div>
  );
}
