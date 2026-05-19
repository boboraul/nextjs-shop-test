// "use client";

import { notFound } from "next/navigation";
import ProductImages from "../components/ProductImages";
import CustomizeProducts from "../components/CustomizeProducts";
import Add from "../components/Add";
import { wixClientServer } from "../lib/wixClientServer";
import SafeHtml from "../components/SafeHtml";
import Breadcrumbs from "../components/Breadcrumbs";

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

  const categoryId = product?.collectionIds?.[0];
  let categoryName = '';

  if (categoryId) {
    const category = await wixClient.collections.getCollection(categoryId);

    categoryName = category?.collection?.name || '';
    categoryUrl = category?.collection?.slug || '';
  }

  const product = products.items[0];

  const discountPercent =
    product.discount?.type === "PERCENT" ? product.discount.value! : null;
  const gCurrency =
    product.price?.currency == "RON" ? "Lei" : product.price?.currency;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative flex flex-col lg:flex-row lg:items-start gap-8 mt-8 lg:mt-12">
      
      <div className="w-full">
        <Breadcrumbs items={[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: categoryName || "Products";
              href: categoryUrl || '';
            },
            {
              label: slug || "Product",
            }
            ]}
        />
      </div>
      
      <div className="w-full lg:w-1/2 h-max relative">
        {discountPercent && (
          <div className="promo-badge bg-danger-500 w-[70px] flex rotate-[9deg] items-center px-2 opacity-80 rounded-tr-3xl leading-[26px] justify-center rounded-bl-3xl left-0 text-white absolute text-[20px] z-[999]">
            <span className="text-white absolute top-[-15px] left-px">.</span>
            {discountPercent}%
          </div>
        )}

        <ProductImages items={product.media?.items} />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-2 mt-2">
        <h1 className="text-2xl font-medium mb-2">{product.name}</h1>

        <SafeHtml
          html={
            product.additionalInfoSections?.find(
              (section: any) => section.title === "shortDesc"
            )?.description
          }
          classes="short-description text-gray-500"
        />

        {product.description && (
         
          <SafeHtml classes="description text-gray-500 my-2"
            html={product.description!}
          />
          )
        }
        
        <SafeHtml
          html={
            product.additionalInfoSections?.find((section: any) => section.title === "Characteristics")?.description
          }
          classes="characteristics pl-5 text-gray-500"
        />
        
        <div className="price-box">
          {product.price?.price === product.price?.discountedPrice ? (
            <div className="text-2xl h2 text-primary-500 font-medium">
              {product.price?.formatted?.discountedPrice?.replace("lei", " ")}
              {gCurrency}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-xl h3 text-gray-500 line-through">
                {product.price?.formatted?.price?.replace("lei", " ")}
                {gCurrency}
              </div>
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
