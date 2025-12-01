"use client";

import { useWishlistStore } from "../hooks/useWishlistStore";
import { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

type AddToWishlistButtonProps = {
  userId: string | null;
  productId: string;
  productName: string;
  productImage?: string;
  createdAt?: string;
};

const AddToWishlistButton = ({
  userId,
  productId,
  productName,
  productImage,
}: AddToWishlistButtonProps) => {
  const { addItem } = useWishlistStore();
  const [loading, setLoading] = useState(false);

  const { fetchWishlist, items } = useWishlistStore();

  useEffect(() => {
    if (!userId) return;
    fetchWishlist(userId);
  }, [userId, fetchWishlist]);

  useEffect(() => {
    console.log("Wishlist items:", items);
  }, [items]);

  const handleAdd = async () => {
    setLoading(true);

    try {
      await addItem({
        userId,
        productId,
        productName,
        productImage,
        createdAt: new Date().toISOString(),
      });
      console.log("✅ You have successfully added to Wishlist!");
    } catch (error) {
      console.error("❌ Failed to add to Wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAdd} disabled={loading}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 text-primary-500"
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
