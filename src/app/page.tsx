// "use client";

import { Suspense } from "react";
import Carousel from "./components/Carousel";
import Slider from "./components/Slider";
// import ProductList from "./components/ProductList";
import CarouselProducts from "./components/CarouselProducts";
import CategoryList from "./components/CategoryList";
import { wixClientServer } from "./lib/wixClientServer";

const HomePage = async () => {

  return (
    <div className="">
      {/* <h1>HomePage</h1> */}
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px]">
        
        <Suspense fallback={"loading"}>
          {/* <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          /> */}

          <div className="my-5">
            <CarouselProducts carouselTitle={'New in'} limit={10} />
          </div>

        </Suspense>
      </div>

      {/* <Carousel /> */}

      <div className="mt-24">
        <div className="text-3xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] mb-12">
          Categories
        </div>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>

      {/* <div className="mt-24 px-4 md;px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px]">
        <div className="text-2xl">New Products</div>
        <ProductList />
      </div> */}
    </div>
  );
};

export default HomePage;
