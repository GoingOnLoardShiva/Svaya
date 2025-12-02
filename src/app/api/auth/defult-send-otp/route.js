import { connectDB } from "../../../../../lib/db";
import Otp from "../../../../../models/Otp";
import generateOtp from "../../../../../lib/otp/generateOtp";
import {sendOtpMail} from "../../../../../lib/otp/signsendOtpMail";
// import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB(); // 🔥 REQUIRED

    let body;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { email } = body;

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    // Generate OTP
    const otp = generateOtp();

    // Update or create user with OTP
    await Otp.updateOne(
      { email },
      {
        otp,
        otpExpiresAt: Date.now() + 10 * 60 * 1000,
      },
      { upsert: true }
    );

    // Send OTP
    await sendOtpMail(email, otp);

    return Response.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return Response.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
