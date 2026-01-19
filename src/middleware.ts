import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/account", "/wishlist"];

function isProtected(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // ignore next internals + api
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const session = req.cookies.get("session")?.value;

  if (session && url.pathname == "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

    // only protect these routes
  if (isProtected(pathname) && !session) {
    url.pathname = "/login";
    return NextResponse.next();
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
