import React, { Suspense } from "react";
import Image from "next/image";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import { wixClientServer } from "../lib/wixClientServer";
import { Spinner } from "../components/Spinner";
import Breadcrumbs from "../components/Breadcrumbs";

const ListPage = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const wixClient = await wixClientServer();
  const ALL_PRODUCTS_ID = "00000000-000000-000000-000000000001";
  const sp = (await searchParams) ?? [];

  const cat = await wixClient.collections.getCollectionBySlug(
    sp.cat || "all-products",
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative mt-4">

      {/* Campaign */}
      <div className="bg-gradient-primary-500-r px-4 flex flex-col lg:flex-row justify-between h-96 lg:h-64">
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

      <Breadcrumbs items={[
          {
            label: 'Home',
            href: '/',
           },
           {
            label: cat?.collection?.name || "Products",
           }
          ]}
      />

      {/* Filters */}
      <Filter />
      {/* Products */}
      <h1 className="mt-4 text-xl font-semibold">{cat?.collection?.name}</h1>
      <Suspense fallback={<Spinner />}>
        <ProductList
          categoryId={cat.collection?._id || ALL_PRODUCTS_ID}
          searchParams={sp}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
