import { createClient, ApiKeyStrategy } from "@wix/sdk";
import * as data from "@wix/data";

export const wixDataClient = createClient({
  modules: { data },
  auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY!,
    siteId: process.env.WIX_SITE_ID!,
  }),
});