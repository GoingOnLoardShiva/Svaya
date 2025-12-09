import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("userToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/entry/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
