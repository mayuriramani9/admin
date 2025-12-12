// import { NextResponse } from "next/server";

// export const runtime = "edge";

// export async function POST() {
//   const response = NextResponse.json({ success: true });
//   response.cookies.delete("admin_token");
//   return response;
// }

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Must match path used when setting it
  res.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
