"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FuturisticHero() {
  return (
    <section className="relative overflow-hidden bg-[#02040A] text-white min-h-[95vh] flex items-center py-20">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Neon Blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#00FFA3]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[450px] h-[450px] bg-[#8A00FF]/20 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Build the Future of{" "}
            <span className="bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>

          <p className="text-lg text-white/70 max-w-xl">
            Our AI-powered SaaS platform helps your business scale with speed,
            precision, and futuristic automation. Designed for creators, teams &
            modern enterprises.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 text-black font-semibold rounded-xl bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] shadow-[0_0_20px_rgba(0,255,163,0.4)]"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <a
              href="#"
              className="px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE — FUTURISTIC SHAPES + IMAGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          {/* Floating Card 1 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-[-40px] right-4 w-40 h-40 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center"
          >
            <p className="text-sm text-white/70">AI Insights</p>
          </motion.div>

          {/* Main futuristic UI card */}
          <motion.div
            initial={{ rotate: -8, y: 20, opacity: 0 }}
            animate={{ rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="w-[420px] h-[420px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6 relative"
          >
            <div className="w-full h-full rounded-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,163,0.25),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(138,0,255,0.25),transparent_60%)]"></div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-[-40px] left-4 w-44 h-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-center"
          >
            <p className="text-sm text-white/70">Automation Engine</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
