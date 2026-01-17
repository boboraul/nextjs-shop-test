import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET!;

type SessionPayload = {
  id: string;
  name: string;
  email: string;
  iat: number;
};

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlToBuffer(str: string) {
  const pad = 4 - (str.length % 4);
  const base64 = (str + (pad === 4 ? "" : "=".repeat(pad)))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Buffer.from(base64, "base64");
}

export function signSession(payload: Omit<SessionPayload, "iat">) {
  const full: SessionPayload = { ...payload, iat: Date.now() };
  const body = base64url(JSON.stringify(full));
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest();
  return `${body}.${base64url(sig)}`;
}

export function verifySession(token: string): SessionPayload | null {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;

    const expected = crypto.createHmac("sha256", SECRET).update(body).digest();
    const got = base64urlToBuffer(sig);

    if (got.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(got, expected)) return null;

    const payload = JSON.parse(base64urlToBuffer(body).toString("utf-8"));
    return payload;
  } catch {
    return null;
  }
}