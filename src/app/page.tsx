// "use client";

import { Suspense, useContext, useEffect } from "react";
import Slider from "./components/Slider";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import { WixClientContext } from "./Context/wixContext";
import { useWixClient } from "./hooks/useWixClient";
import { wixClientServer } from "./lib/wixClientServer";

const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const response = await wixClient.products.queryProducts().find();
  //       console.log("Products:", response);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };

  //   getProducts();
  // }, [wixClient]);

  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);
  return (
    <div className="">
      {/* <h1>HomePage</h1> */}
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="text-2xl">Featured</div>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>

      <div className="mt-24">
        <div className="text-3xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </div>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>

      {/* <div className="mt-24 px-4 md;px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="text-2xl">New Products</div>
        <ProductList />
      </div> */}
    </div>
  );
};

export default HomePage;
