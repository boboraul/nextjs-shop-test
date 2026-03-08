"use client";

import { create } from "zustand";

type WishlistItem = {
  _id?: string;
  userId: string | null;
  productId: string;
  productName: string;
  productImage?: string;
  createdAt?: string;
  productUrl?: string;
  price?: number;
  discountedPrice?: number;
  currency?: string;
  discountPercent?: number | null;
};

type WishlistStore = {
  items: WishlistItem[];
  isLoading: boolean;
  userId: string | null; // keep userId global in store
  setUserId: (id: string | null) => void; // setter for userId
  userIdLoaded: string | null; //  anti-refetch guard

  fetchWishlist: () => Promise<void>;
  addItem: (item: WishlistItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: false,
  userId: null,
  setUserId: (id) =>
    set((state) => {
      if (state.userId === id) return { userId: id };
      return {
        userId: id,
        userIdLoaded: null, // reset guard
        items: [], // empty list until next refetch
      };
    }),
  userIdLoaded: null,

  fetchWishlist: async () => {
    set({ isLoading: true });

    try {
      const res = await fetch("/api/wishlist", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();

      if (get().userIdLoaded === data.userId) return; // cancel refetch and UI stops flickering

      set({
        items: (data.items as WishlistItem[]) ?? [],
        userIdLoaded: data.userId ?? null, // load for this user
      });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed to add wishlist item");
      const data = await res.json();

      set((state) => ({
        items: [
          ...state.items,
          (data.item?.item ?? data.item ?? data) as WishlistItem,
        ],
      }));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  },

  removeItem: async (itemId) => {
    try {
      const res = await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove wishlist item");

      set((state) => ({
        items: state.items.filter((item) => item._id !== itemId),
      }));
    } catch (error) {
      console.error("Error at deleting item from wishlist", error);
    }
  },
}));
