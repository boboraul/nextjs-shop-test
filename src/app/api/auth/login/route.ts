import { OAuthStrategy } from "@wix/sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const wixOAuth = new OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID!,
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
  });

  const { authUrl } = wixOAuth.getAuthUrl();

  console.log("WIX AUTH URL:", authUrl);

  return NextResponse.redirect(authUrl);
}
