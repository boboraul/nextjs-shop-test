"use client";

import { create } from "zustand";
import { wixClientBrowser } from "../lib/wixClientBrowser";

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
  fetchWishlist: (userId: string) => Promise<void>;
  addItem: (item: WishlistItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async (userId) => {
    set({ isLoading: true });
    try {
      const client = wixClientBrowser() as any;

      const result = await client.data.items
        .query(wishlistId)
        .eq("userId", userId)
        .find();
      set({ items: result.items || [] });
    } catch (error) {
      console.error("Eroare la fetch wishlist:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    try {
      const client = wixClientBrowser() as any;
      const result = await client.data.items.insert(wishlistId, item);
      set((state) => ({ items: [...state.items, result] }));
    } catch (error) {
      console.error("Eroare la adăugare în wishlist:", error);
    }
  },

  removeItem: async (itemId) => {
    try {
      const client = wixClientBrowser() as any;
      await client.data.items.remove(wishlistId, itemId);
      set((state) => ({
        items: state.items.filter((item) => item._id !== itemId),
      }));
    } catch (error) {
      console.error("Eroare la ștergere din wishlist:", error);
    }
  },
}));
