"use client";

import Cookies from "js-cookie";
import { createClient, OAuthStrategy, WixClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import * as wixData from "@wix/data";
import { members } from "@wix/members";
import { ReactNode, createContext } from "react";

// Token refresh
const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

// Definim modulele clientului
type MyWixModules = {
  products: typeof products;
  collections: typeof collections;
  currentCart: typeof currentCart;
  data: typeof wixData;
  members: typeof members;
};

// Tipul clientului complet
export type MyWixClient = WixClient<undefined, any, MyWixModules>;

// Cream clientul
const wixClient: MyWixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    data: wixData,
    members,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
}) as MyWixClient;

// Context
export const WixClientContext = createContext<MyWixClient | null>(null);

// Provider
export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
