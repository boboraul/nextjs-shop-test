"use client";

import { createClient, OAuthStrategy, WixClient } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import * as wixData from "@wix/data";
import { members } from "@wix/members";

// definim explicit modulele clientului
type MyWixModules = {
  products: typeof products;
  collections: typeof collections;
  data: typeof wixData;
  members: typeof members;
};

// tipul WixClient personalizat
export type MyWixClient = WixClient<undefined, any, MyWixModules>;

export const wixClientBrowser = (): MyWixClient => {
  return createClient({
    modules: {
      products,
      collections,
      data: wixData,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        accessToken: { value: "", expiresAt: 0 },
        refreshToken: { value: "", role: "VISITOR" as any },
      },
    }),
  }) as MyWixClient;
};
