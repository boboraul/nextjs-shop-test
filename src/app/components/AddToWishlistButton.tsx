"use client";

import { useWishlistStore } from "../hooks/useWishlistStore";
import { useState, useEffect } from "react";
import { useWixClient } from "../hooks/useWixClient";

type AddToWishlistButtonProps = {
  productId: string;
  productName: string;
  productImage?: string;
  createdAt?: string;
  productUrl?: string;
  price?: number;
  discountedPrice?: number;
  currency?: string;
  size?: "sm" | "md"; // wishlist heart icon size
};

const AddToWishlistButton = ({
  productId,
  productName,
  productImage,
  productUrl,
  price,
  discountedPrice,
  currency,
  size = "md", // default
}: AddToWishlistButtonProps) => {
  const wixClient = useWixClient();
  const { addItem, removeItem, items } = useWishlistStore();
  const [loading, setLoading] = useState(false);

  const userId = useWishlistStore((s) => s.userId); // NEW: userId vine din store (setat de WishlistInitializer)
  const svgClass =
    size === "sm" ? "w-5 h-5 text-primary-500" : "w-8 h-8 text-primary-500";

  const added = items.some((item) => item.productId === productId);

  useEffect(() => {
    console.log("added: " + added);
  }, [added]);

  const handleAdd = async () => {
    if (!userId) {
      console.warn("User not logged in, cannot add to wishlist");
      return;
    }

    setLoading(true);

    try {
      await addItem(wixClient, {
        userId, // NEW: userId vine din store
        productId,
        productName,
        productImage,
        createdAt: new Date().toISOString(),
        productUrl,
        price,
        discountedPrice,
        currency,
      });
      console.log("✅ You have successfully added to Wishlist!");
    } catch (error) {
      console.error("❌ Failed to add to Wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id: string) => {
    removeItem(wixClient, id);
  };

  const wishlistItem = items.find((item) => item.productId === productId);

  return (
    <button
      onClick={() =>
        added && wishlistItem ? handleRemove(wishlistItem._id!) : handleAdd()
      }
      disabled={loading}
      className="heart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={added ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={svgClass}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
};

export default AddToWishlistButton;
