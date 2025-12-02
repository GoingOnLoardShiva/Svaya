import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import verifyOtp from "../../../../../lib/otp/signverifyotp";

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

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
