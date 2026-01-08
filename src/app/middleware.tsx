import { NextRequest, NextResponse } from "next/server";
import { createClient, OAuthStrategy } from "@wix/sdk";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // NU rula pe API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    return res;
  }

  // Daca exista deja refreshToken → gata
  if (req.cookies.get("refreshToken")) {
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
    secure: true,      // 🔴 OBLIGATORIU pe Vercel
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
