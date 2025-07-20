"use client";

import React from "react";
import { products } from "@wix/stores";

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) => {
  console.log(productOptions);
  return (
    <div className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          {option.choices?.map((choice) => (
            <div className="" key={choice.value}>
              {choice.description}
            </div>
          ))}
        </div>
      ))}

      {/* Color */}
      {/* <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-600">
              <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </li>

            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-600"></li>
            <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-600">
              <div className="absolute w-10 h-[2px] rotate-45 bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </li>
          </ul> */}

      {/* Size   */}
      {/* <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className="ring-1 ring-primary-500 text-primary-500 rounded-md py-1 px-4 text-sm cursor-pointer">
          S
        </li>

        <li className="ring-1 selected ring-primary-500 text-white bg-primary-500 rounded-md py-1 px-4 text-sm cursor-pointer">
          M
        </li>

        <li className="ring-1 ring-primary-500 text-white rounded-md py-1 px-4 text-sm bg-primary-200 cursor-not-allowed">
          L
        </li>
      </ul> */}
    </div>
  );
};

export default CustomizeProducts;
