import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { products } from "@wix/stores";

export const wixReindexClient = createClient({
  modules: { products },
  auth: ApiKeyStrategy({
    apiKey: process.env.QDRANT_REINDEX_PRODUCTS_DEV!,
    siteId: process.env.WIX_SITE_ID!,
  }),
});