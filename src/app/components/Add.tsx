"use client";

import React, { useState } from "react";
import { useCartStore } from "../hooks/useCartStore";
import AddToWishlistButton from "./AddToWishlistButton";

const Add = ({
  productId,
  variantId,
  selectedVariant,
  stockNumber,
  productName,
  productImage,
  createdAt,
  price,
  currency,
  productUrl,
}: {
  productId: string;
  variantId: string;
  selectedVariant?: Record<string, string>;
  stockNumber: number;
  productName: string;
  productImage: string;
  createdAt?: string;
  price?: number;
  currency?: string;
  productUrl?: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };
  
  const disabled = stockNumber === 0;

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose quantity</h4>
      <div className="flex gap-2 items-center">
        <div className="bg-gray-200 w-32 just rounded-3xl flex items-center justify-between">
          <button
            className="cursor-pointer py-1 px-4 text-xl"
            onClick={() => handleQuantity("d")}
          >
            -
          </button>

          {stockNumber == 0 ? stockNumber : quantity}

          <button
            className="cursor-pointer py-1 px-4 text-xl"
            onClick={() => handleQuantity("i")}
          >
            +
          </button>
        </div>
        <div className="text-xs">
          <span className="text-orange-500">
            {stockNumber} {stockNumber == 1 ? "item " : "items "}
          </span>
          available
          <br />
          Don&apos;t miss it
        </div>

        <button
          onClick={() =>
            addItem({
              productId,
              variantId,
              quantity,
              productName,
              productImage,
              selectedVariant,
              price,
              currency,
              productUrl,
            })
          }
          disabled={disabled}
          className="w-36 ml-auto text-sm rounded-3xl ring-1 text-primary-500 py-2 px-4 hover:bg-primary-500 hover:text-white ring-primary-500 disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-600 disabled:ring-gray-500"
        >
          {stockNumber > 0 ? "Add to Cart" : "Out of stock"}
        </button>

        {/* nu mai trimitem userId, il ia butonul singur din /api/auth/me */}
        <AddToWishlistButton
          productId={productId}
          productName={productName}
          productImage={productImage}
          createdAt={createdAt}
          productUrl={productUrl}
          price={price}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default Add;
