import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("userToken")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next(); // allow
  } catch (error) {
    // Invalid token → force logout
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Protect these routes
export const config = {
  matcher: [
    "/dashboard",  // Only logged in users can access dashboard
    "/dashboard/:path*",  // Only logged in users can access dashboard
    "/admin/:path*",      // You can add more protected routes
  ],
};
