"use client";

import { useEffect, useContext } from "react";
import Slider from "./Slider";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";

export default function HomeClient({ searchParams }: { searchParams?: any }) {
  return (
    <>
      <Slider />
      <CategoryList />
      <ProductList categoryId="all-products" searchParams={searchParams} />
    </>
  );
}
