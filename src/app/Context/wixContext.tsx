"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createClient, OAuthStrategy, WixClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import * as wixData from "@wix/data";
import { members } from "@wix/members";

// definim modulele clientului
type MyWixModules = {
  products: typeof products;
  collections: typeof collections;
  currentCart: typeof currentCart;
  data: typeof wixData;
  members: typeof members;
};

// tipul clientului complet
export type MyWixClient = WixClient<undefined, any, MyWixModules>;

// context
export const WixClientContext = createContext<MyWixClient | null>(null);

// provider
export const WixClientContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [client, setClient] = useState<MyWixClient | null>(null);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");

    const wixClient = createClient({
      modules: {
        products,
        collections,
        currentCart,
        data: wixData,
        members,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: refreshToken ? ({ refreshToken } as any) : undefined,
      }),
    }) as MyWixClient;

    setClient(wixClient);
  }, []);

  if (!client) return null;

  return (
    <WixClientContext.Provider value={client}>
      {children}
    </WixClientContext.Provider>
  );
};
