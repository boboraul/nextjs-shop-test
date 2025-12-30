import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
  productName?: string;
  productImage?: string;
  price?: number;
  selectedVariant?: Record<string, string>;
};

type CartState = {
  items: CartItem[];
  counter: number;

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string
  ) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      counter: 0,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId && i.variantId === item.variantId
          );

          const items = existing
            ? state.items.map((i) =>
                i.productId === item.productId && i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            : [...state.items, item];

          return {
            items,
            counter: items.reduce((s, i) => s + i.quantity, 0),
          };
        }),

      removeItem: (productId, variantId) =>
        set((state) => {
          const items = state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          );

          return {
            items,
            counter: items.reduce((s, i) => s + i.quantity, 0),
          };
        }),

      updateQuantity: (productId, quantity, variantId) =>
        set((state) => {
          const items = state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          );

          return {
            items,
            counter: items.reduce((s, i) => s + i.quantity, 0),
          };
        }),

      clearCart: () => ({
        items: [],
        counter: 0,
      }),
    }),
    {
      name: "cart-storage",
    }
  )
);
