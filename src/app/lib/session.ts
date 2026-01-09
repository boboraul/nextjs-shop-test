import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  email?: string;
};

export type SessionData = { 
  user?: SessionUser; 
  wixMemberTokens?: { 
    accessToken?: string; 
    refreshToken: string; 
  }; 
};

export const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "site_session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};

export async function getSession() {
  if (!process.env.SESSION_PASSWORD) {
    throw new Error("Missing SESSION_PASSWORD env var");
  }

  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
