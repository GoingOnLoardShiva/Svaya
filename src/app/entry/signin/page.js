"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Header from "@/app/components/fixedC/Header";
import FuturisticFooter from "@/app/components/fixedC/Footer";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (step === 2) {
      setOtp("");
    }
  }, [step]);

  // USERNAME VALIDATION
  const handleUsernameChange = async (value) => {
    setUsername(value);
    setUsernameError(false);
    setUsernameChecking(true);
    try {
      const res = await axios.post("/api/auth/check-username", {
        username: value,
      });
      if (res.data.exists == false) {
        setUsernameError(false);
      } else {
        setUsernameError(true);
      }
    } catch (err) {
      setUsernameError(true);
    }
    setUsernameChecking(false);
  };

  const userCategories = [
    "Developer",
    "Designer",
    "Gamer",
    "Influencer",
    "YouTuber",
    "Entrepreneur",
  ];

  // STEP 1 — Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/defult-send-otp", { email });

      if (!res.data.success) {
        setError(res.data.message);
        setLoading(false);
        return;
      }

      setStep(2);
    } catch (err) {
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  // STEP 2 — Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/defult-verify-otp", {
        email,
        otp,
      });

      if (!res.data.success) {
        setError(res.data.message);
        setLoading(false);
        return;
      }

      setStep(3);
    } catch (err) {
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  // STEP 3 — Final Submit
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/signup", {
        email,
        password,
        category,
        username,
      });

      if (!res.data.success) {
        setError(res.data.message);
        setLoading(false);
        const savedDataLocal = localStorage.setItem(
          "signupData",
          JSON.stringify({ res: res.data })
        );

        return;
      }

      alert("Account Created Successfully!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  const GoogleAuth = () => {
    alert("Google Sign-In Clicked (Integrate API)");
  };

  return (
    <div className="head-entry">
      <Header />
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#020710]">
        {/* Glow */}
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-[#00FFA3]/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-220px] right-[-150px] w-[600px] h-[500px] bg-[#8A00FF]/20 blur-[140px] rounded-full" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl text-white font-semibold text-center mb-6 tracking-wide">
            {step === 1 && "Create Account"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Select Category"}
          </h2>

          {error && (
            <p className="text-red-400 bg-red-900/30 p-2 rounded-lg text-center mb-4">
              {error}
            </p>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="text-gray-300 text-sm">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-3 bg-black/30 text-white rounded-xl border border-white/10 focus:border-[#00FFA3]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm">Password</label>
                <input
                  type="password"
                  className="w-full mt-1 p-3 bg-black/30 text-white rounded-xl border border-white/10 focus:border-[#00FFA3]"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00FFA3] to-[#00D4FF] text-black py-3 rounded-xl font-semibold"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              <div
                onClick={GoogleAuth}
                className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 bg-black/20 hover:bg-black/30 rounded-xl cursor-pointer"
              >
                <FcGoogle size={22} />
                <span className="text-white text-sm font-semibold">
                  Continue with Google
                </span>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <p className="text-gray-300 text-center text-sm">
                Enter the 6-digit code sent to{" "}
                <span className="text-[#00FFA3]">{email}</span>
              </p>

              <input
                type="text"
                maxLength="6"
                className="tracking-widest text-center text-xl w-full p-3 bg-black/30 text-white rounded-xl border border-white/10 focus:border-[#00FFA3]"
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#00FFA3] to-[#00D4FF] text-black py-3 rounded-xl"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              {/* USERNAME INPUT */}
              <div>
                <label className="text-white text-sm">Choose Username</label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="w-full mt-2 p-3 bg-black/20 border border-white/10 text-white rounded-xl focus:border-[#00FFA3] outline-none"
                  placeholder="Enter unique username"
                />

                {/* Username Loading */}
                {usernameChecking && (
                  <p className="text-yellow-400 text-sm mt-1">Checking...</p>
                )}

                {/* Username Available */}
                {!usernameChecking && username && !usernameError && (
                  <p className="text-green-400 text-sm mt-1">
                    Username available ✓
                  </p>
                )}

                {/* Username Taken */}
                {!usernameChecking && usernameError && (
                  <p className="text-red-400 text-sm mt-1">
                    ❌ This username is already taken
                  </p>
                )}
              </div>

              {/* USER CATEGORY GRID */}
              <div className="grid grid-cols-2 gap-3">
                {userCategories.map((item) => (
                  <div
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`p-3 rounded-xl text-center text-white cursor-pointer border transition ${
                      category === item
                        ? "bg-[#00FFA3]/20 border-[#00FFA3]"
                        : "bg-black/20 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={!category || !username || usernameError || loading}
                className="w-full bg-gradient-to-r from-[#00FFA3] to-[#00D4FF] text-black py-3 rounded-xl"
              >
                {loading ? "Creating Account..." : "Submit & Finish"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
      <FuturisticFooter />
    </div>
  );
}
