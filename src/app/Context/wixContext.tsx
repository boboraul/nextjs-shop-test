"use client";

import { createClient, OAuthStrategy, WixClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import * as wixData from "@wix/data";
import { members } from "@wix/members";
import { ReactNode, createContext, useMemo, useEffect } from "react";

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

// Context
export const WixClientContext = createContext<MyWixClient | null>(null);

// Provider "smart"
export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Cream clientul o singura data
  const wixClient: MyWixClient = useMemo(() => {
    return createClient({
      modules: {
        products,
        collections,
        currentCart,
        data: wixData,
        members,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      }),
    }) as MyWixClient;
  }, []);

  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
