import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { contacts } from "@wix/crm";

export const wixContactsClient = createClient({
  modules: {
    contacts,
  },
  auth: ApiKeyStrategy({
    apiKey: process.env.WIX_API_KEY!,
    accountId: process.env.WIX_SITE_ID!,
  }),
});