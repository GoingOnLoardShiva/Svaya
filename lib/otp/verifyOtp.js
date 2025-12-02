import User from "../../models/User";

export default async function verifyOtp(email, otp) {
  const user = await User.findOne({ email });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (!user.otp || user.otp !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  // Clear the OTP after success
  user.otp = null;
  await user.save();

  return { success: true, message: "OTP verified successfully" };
}
