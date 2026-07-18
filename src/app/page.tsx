// "use client";

import { Suspense } from "react";
import Slider from "./components/Slider";
import ProductsCarousel from "./components/ProductsCarousel";
import CategoryList from "./components/CategoryList";

const HomePage = async () => {

  return (
    <div className="Homepage">
    
      <Slider />

      <div className="mt-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px]">

         <div className="homepage-title my-20 text-center">
            <h1 className="text-2xl font-bold">Discover Curated Products for a Smarter Shopping Experience</h1>
         </div>
        
        <Suspense fallback={"Loading..."}>
           <div className="mt-10">
            <ProductsCarousel
              categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
              limit={8}
              carouselTitle={'Featured'}
            />
          </div>

          <div className="mt-20">
            {/* New Products carousel */}
            <ProductsCarousel carouselTitle={'New in'} 
            limit={20}
            sortKey={'lastUpdated'} 
            />
          </div>
          
        </Suspense>
      </div>

      <div className="mt-10">

        <div className="text-3xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] mb-6">
          <div className="text-2xl">
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
