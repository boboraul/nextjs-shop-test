"use client";

import { create } from "zustand";
import type { MyWixClient } from "../Context/wixContext";

type WishlistItem = {
  _id?: string;
  userId: string | null;
  productId: string;
  productName: string;
  productImage?: string;
  createdAt?: string;
};

const wishlistId = "jdo2u3dohad8yt12dghqasdau";

type WishlistStore = {
  items: WishlistItem[];
  isLoading: boolean;
  fetchWishlist: (client: MyWixClient, userId: string) => Promise<void>;
  addItem: (client: MyWixClient, item: WishlistItem) => Promise<void>;
  removeItem: (client: MyWixClient, itemId: string) => Promise<void>;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async (client, userId) => {
    set({ isLoading: true });

    try {
      const result = await (client as any).data.items
        .query(wishlistId)
        .eq("userId", userId)
        .find();
      set({ items: (result.items as WishlistItem[]) ?? [] });
    } catch (error) {
      console.error("Eroare la fetch wishlist:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (client, item) => {
    try {
      const result = await (client as any).data.items.insert(wishlistId, item);
      set((state) => ({ items: [...state.items, result as WishlistItem] }));
    } catch (error) {
      console.error("Eroare la adăugare în wishlist:", error);
    }
  },

  removeItem: async (client, itemId) => {
    try {
      await (client as any).data.items.remove(wishlistId, itemId);
      set((state) => ({
        items: state.items.filter((item) => item._id !== itemId),
      }));
    } catch (error) {
      console.error("Eroare la ștergere din wishlist:", error);
    }
  },
}));
