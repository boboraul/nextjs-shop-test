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
};

const AddToWishlistButton = ({
  productId,
  productName,
  productImage,
  productUrl,
  price,
}: AddToWishlistButtonProps) => {
  const wixClient = useWixClient();
  const { fetchWishlist, addItem, items } = useWishlistStore();
  const [loading, setLoading] = useState(false);

  // userId folosit in wishlist (vine din /api/auth/me)
  const [userId, setUserId] = useState<string | null>(null);

  // Luam user-ul logat din /api/auth/me
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;

        // folosim id-ul intern din sesiune (nu email)
        setUserId(data.user?.id ?? null);
        console.log("wishlist userId:", data.user?.id);
      } catch {
        setUserId(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Cand avem userId, incarcam wishlist-ul userului curent
  useEffect(() => {
    if (!userId) return;
    fetchWishlist(wixClient, userId);
  }, [userId, wixClient, fetchWishlist]);

  useEffect(() => {
    console.log("Wishlist items:", items);
  }, [items]);

  const handleAdd = async () => {
    if (!userId) {
      console.warn("User not logged in, cannot add to wishlist");
      return;
    }

    setLoading(true);

    try {
      await addItem(wixClient, {
        userId,
        productId,
        productName,
        productImage,
        createdAt: new Date().toISOString(),
        productUrl,
        price,
      });
      console.log("✅ You have successfully added to Wishlist!");
    } catch (error) {
      console.error("❌ Failed to add to Wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleAdd} disabled={loading} className="heart">
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
