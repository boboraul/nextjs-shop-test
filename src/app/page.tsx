// "use client";

import { Suspense } from "react";
import Slider from "./components/Slider";
import CarouselProducts from "./components/CarouselProducts";
import CategoryList from "./components/CategoryList";

const HomePage = async () => {

  return (
    <div className="Homepage">
    
      <Slider />

      <div className="mt-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px]">

         <div className="homepage-title mt-5 text-center">
            <h1 className="text-2xl font-bold">Discover Curated Products for a Smarter Shopping Experience</h1>
         </div>
        
        <Suspense fallback={"Loading..."}>
           <div className="mt-10">
            <CarouselProducts
              categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
              limit={4}
              carouselTitle={'Featured'}
            />
          </div>

          <div className="mt-20">
            <CarouselProducts carouselTitle={'New in'} limit={10} />
          </div>
          
        </Suspense>
      </div>

      <div className="mt-10">

        <div className="text-3xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] mb-10">
          <<div className="text-2xl">
            Categories
          </div>
        </div>

        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>

    </div>
  );
};

export default HomePage;
