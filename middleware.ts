import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function hmacHex(message: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// base64url decode in Edge (NO Buffer)
function b64urlToString(b64url: string) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  return atob(b64 + pad);
}

export async function middleware(req: NextRequest) {
  const secret = process.env.SESSION_SECRET;
  const token = req.cookies.get("admin_session")?.value;

  if (!secret || !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const expected = await hmacHex(payloadB64, secret);
  if (sig !== expected) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  let payload: any;
  try {
    payload = JSON.parse(b64urlToString(payloadB64));
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!payload?.exp || Date.now() > payload.exp) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
