import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import verifyOtp from "../../../../../lib/otp/verifyOtp";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "../../../../../models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email & OTP required" },
        { status: 400 }
      );
    }

    const result = await verifyOtp(email, otp);
    // const getUser = User.findOne({ email });
    // console.log(getUser);
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✔ FIXED: Correct JWT payload
    const token = jwt.sign(
      { id: getUser.uuid, role: getUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }
    if (result.success) {
      //get user details from user collection

      // Set HttpOnly cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: "auth_token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      const response = NextResponse.json(
        {
          success: true,
          message: "OTP verified",
          userId: getUser.uuid,
          username: getUser.username,
          token: token,
        },
        { status: 200 }
      );
      return response;
    }

    // return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
