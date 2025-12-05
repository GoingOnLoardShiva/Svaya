import { connectDB } from "../../../../../lib/db";
import User from "../../../../../models/User";
import Otp from "../../../../../models/Otp";
import generateOtp from "../../../../../lib/otp/generateOtp";
import sendOtpMail from "../../../../../lib/otp/sendOtpMail";
import bcrypt from "bcryptjs";

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
    //exesting user check
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }
    //check bcrypt compare hashed password if password is provided
    if (body.password) {
      const isMatch = await bcrypt.compare(
        body.password,
        existingUser.password
      );
      if (!isMatch) {
        return Response.json(
          { success: false, message: "Invalid password" },
          { status: 400 }
        );
      }
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
