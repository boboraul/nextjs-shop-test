import { createClient, ApiKeyStrategy } from "@wix/sdk";
import * as data from "@wix/data";
import { products } from "@wix/stores";

export const wixDataClient = createClient({
  modules: { data,
    products
   },
  auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY!,
    siteId: process.env.WIX_SITE_ID!,
  }),
});