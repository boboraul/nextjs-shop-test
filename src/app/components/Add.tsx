"use client";

import React from "react";
import { useState } from "react";
import { useWixClient } from "../hooks/useWixClient";
import { useCartStore } from "../hooks/useCartStore";
import AddToWishlistButton from "./AddToWishlistButton";

import { useEffect } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
  productName,
  productImage,
  createdAt,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
  productName: string;
  productImage: string;
  createdAt?: string;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);

  // Temporary
  // const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!wixClient) return;
      try {
        const { member } = await wixClient.members.getCurrentMember();
        if (member) setUserId(member._id ?? null);
      } catch (error) {
        // console.error("Eroare la obținerea userului:", error);
        setUserId(null);
      }
    };

    fetchUser();
  }, [wixClient]);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose quantity</h4>
      <div className="flex gap-4 items-center">
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
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={!stockNumber ? true : false}
          className="w-36 ml-16 text-sm rounded-3xl ring-1 text-primary-500 py-2 px-4 hover:bg-primary-500 hover:text-white ring-primary-500 disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-600 disabled:ring-gray-500"
        >
          {stockNumber > 0 ? "Add to Cart" : "Out of stock"}
        </button>

        {userId && (
          <AddToWishlistButton
            userId={userId}
            productId={productId}
            productName={productName}
            productImage={productImage}
          />
        )}
      </div>
    </div>
  );
};

export default Add;
