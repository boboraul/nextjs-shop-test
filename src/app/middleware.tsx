import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const res = NextResponse.next();

  if (request.cookies.get("refreshToken")) {
    return res;
  }

  // Wix visitor tokens - identify this browser as a Wix visitor
  const wixClient = createClient({
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();

  // HttpOnly visitor token used by Wix APIs (anonymous user)
  res.cookies.set("refreshToken", tokens.refreshToken.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
};

export const config = {
  matcher: ["/((?!_next|favicon.ico|api/auth).*)",],
};
