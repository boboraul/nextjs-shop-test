import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // DACA avem deja refreshToken → nu mai facem nimic
  if (req.cookies.get("refreshToken")) {
    return res;
  }

  // IMPORTANT: NU rula middleware pe request-uri API
  if (req.nextUrl.pathname.startsWith("/api")) {
    return res;
  }

  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();

  res.cookies.set("refreshToken", tokens.refreshToken.value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
