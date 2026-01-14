import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import * as data from "@wix/data";
import { members } from "@wix/members";

export const wixClientServer = () => {
  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      data,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });
};