import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";
import { createClient, OAuthStrategy } from "@wix/sdk";

export const wixClientServer = async () => {
    let refreshToken;

    try {
        const cookieStore = cookies();
        refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");

    }
    catch (e) {}

    const wixClient = createClient({
        modules: {
            collections,
            products,
            // currentCart
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
              refreshToken,
              accessToken: { value: "", expiresAt: 0 },
            },
        }),
    });

    return wixClient;
};