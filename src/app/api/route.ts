// src/app/api/login/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const refreshToken = searchParams.get("refreshToken");

  if (refreshToken) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("refreshToken", JSON.stringify(refreshToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true în producție
      path: "/",
    });
    return response;
  }

  return new NextResponse("Missing refresh token", { status: 400 });
}