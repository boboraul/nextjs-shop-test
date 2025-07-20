"use client";

import React from "react";
import { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState(1);
  // Temporary
  const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose quantity</h4>
      <div className="flex gap-4 items-center">
        <div className="bg-gray-200 w-32 just rounded-3xl flex items-center justify-between">
          <button
            className="cursor-pointer py-2 px-4 text-xl"
            onClick={() => handleQuantity("d")}
          >
            -
          </button>
          {quantity}
          <button
            className="cursor-pointer py-2 px-4 text-xl"
            onClick={() => handleQuantity("i")}
          >
            +
          </button>
        </div>

        <div className="text-xs">
          Only <span className="text-orange-500">4 items</span> left!
          <br />
          Don't miss it
        </div>

        <button className="w-36 ml-16 text-sm rounded-3xl ring-1 text-primary-500 py-2 px-4 hover:bg-primary-500 hover:text-white ring-primary-500 disabled:cursor-not-allowed disabled:bg-primary-200 disabled:text-white disabled:ring-none">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
