
import { NextResponse } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";

export async function GET() {
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID!,
    }),
  });

  const { authorizationUrl } =
    wixClient.auth.generateOAuthUrl({
      redirectUri: process.env.WIX_REDIRECT_URI!,
    });

  return NextResponse.json({ authorizationUrl });
}
