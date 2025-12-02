"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ----------------------------
  // SEND OTP FUNCTION
  // ----------------------------
  const sendOtp = async () => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: "Error sending OTP" };
    }
  };

  // ----------------------------
  // LOGIN HANDLER
  // ----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.includes("@") || password.length < 4) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const result = await sendOtp();

    if (!result.success) {
      setError(result.message || "Failed to send OTP");
      setLoading(false);
      return;
    }

    setStep(2);
    setLoading(false);
  };

  // ----------------------------
  // OTP SUBMIT
  // ----------------------------
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const code = otp.join("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json();

      if (!data.success) {
        setError("Incorrect OTP");
        setLoading(false);
        return;
      }

      document.cookie = `userToken=${data.token}; path=/;`;
      router.push("/dashboard");
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  const updateOtp = (value, index) => {
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
  };

  return (
    <div className="min-h-screen bg-[#010308] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Futuristic Glow */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-[#00FFA3]/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-220px] right-[-150px] w-[600px] h-[500px] bg-[#8A00FF]/20 blur-[140px] rounded-full" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 md:p-10"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="login-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-white/60 text-center mb-6 text-sm">
                Login to continue with your futuristic dashboard
              </p>

              {error && (
                <p className="text-red-400 bg-red-900/20 p-2 rounded-lg text-center mb-4">
                  {error}
                </p>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-white/80 text-sm flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input
                    type="email"
                    className="w-full mt-1 p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-[#00FFA3]"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm flex items-center gap-2">
                    <Lock size={16} /> Password
                  </label>
                  <input
                    type="password"
                    className="w-full mt-1 p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-[#00FFA3]"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] text-black py-3 rounded-xl font-semibold shadow-[0_0_25px_rgba(0,255,163,0.3)] hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Continue"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <ShieldCheck size={42} className="text-[#00FFA3]" />
              </div>

              <h2 className="text-2xl font-bold text-white text-center">
                Enter Verification Code
              </h2>
              <p className="text-white/60 text-center mb-6 text-sm">
                A 4-digit code was sent to{" "}
                <span className="text-[#00FFA3]">{email}</span>
              </p>

              {error && (
                <p className="text-red-400 bg-red-900/20 p-2 rounded-lg text-center mb-4">
                  {error}
                </p>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-between gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      className="w-14 h-14 text-center text-xl bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-[#00FFA3]"
                      value={digit}
                      onChange={(e) => updateOtp(e.target.value, i)}
                      required
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] text-black py-3 rounded-xl font-semibold shadow-[0_0_25px_rgba(0,255,163,0.3)] hover:scale-[1.02] transition disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
