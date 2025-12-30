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
  // 1) Cream clientul o singura data
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

  // 2) Dupa mount, incercam sa-l "ridicam" la member folosind accessToken din sesiune
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/auth/wix-access-token", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();
        if (cancelled) return;

        if (data.loggedIn && data.accessToken) {
          wixClient.auth.setTokens({
            accessToken: { value: data.accessToken },
          } as any);
        }
      } catch (err) {
        console.error(
          "Failed to hydrate Wix client with member access token",
          err
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [wixClient]);

  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
