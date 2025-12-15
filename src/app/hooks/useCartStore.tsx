import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { MyWixClient } from "../Context/wixContext";

//Because sdk @wix/ecom doesn`t have subtotal field in currentCart.Cart
export type ExtendedCart = currentCart.Cart & {
  subtotal?: { amount?: number; formattedAmount?: string };
  subtotalAfterDiscounts?: { amount?: number; formattedAmount?: string };
  totals?: {
    subtotal?: { amount?: number; formattedAmount?: string };
    total?: { amount?: number; formattedAmount?: string };
  };
};

type CartState = {
  cart: ExtendedCart | undefined;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: MyWixClient) => void;
  addItem: (
    wixClient: MyWixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: MyWixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: {},
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || {},
        isLoading: false,
        counter: cart?.lineItems?.length || 0,
      });
    } catch (err: any) {
      // If no cart exists yet → just treat as empty
      if (err.response?.status === 404) {
        set({
          cart: undefined,
          isLoading: false,
          counter: 0,
        });
      } else {
        set((prev) => ({ ...prev, isLoading: false }));
      }
    }
  },

  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            // process.env.NEXT_PUBLIC_WIX_APP_ID!,
            appId: "wix-stores", 
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length,
      isLoading: false,
    });
  },

  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    set({
      cart: response.cart,
      counter: response.cart?.lineItems?.length,
      isLoading: false,
    });
  },
}));
