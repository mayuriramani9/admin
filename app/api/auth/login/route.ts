// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export const runtime = "edge";

// export async function POST(req: Request) {
//   try {
//     const { password } = await req.json();

//     if (password === process.env.ADMIN_PASSWORD) {
//       const response = NextResponse.json({ success: true });

//       // Set a simple cookie (In production, use a real JWT library like 'jose')
//       response.cookies.set("admin_token", "authenticated", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         path: "/",
//         maxAge: 60 * 60 * 24, // 1 day
//       });

//       return response;
//     }

//     return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs"; // use node crypto

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const exp = Date.now() + 1000 * 60 * 60 * 8; // 8 hours
  const payload = JSON.stringify({ role: "admin", exp });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = sign(b64, process.env.SESSION_SECRET);
  const token = `${b64}.${sig}`;

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(exp),
  });

  return res;
}
