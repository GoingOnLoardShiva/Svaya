"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

export default function FuturisticFooter() {
  return (
    <footer className=" bg-gradient-to-b from-[#06070A] via-[#071028] to-[#0b0820] text-white">
      {/* Top decorative SVG */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 overflow-hidden">
        <svg
          className="w-full h-12 md:h-20 opacity-30"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
            fill="url(#g)"
            opacity="0.7"
          />
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#00FFA3" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#00A3FF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#8A00FF" stopOpacity="0.06" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Brand + short */}
          <div className="md:col-span-4 lg:col-span-3">
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FFA3] to-[#8A00FF] flex items-center justify-center shadow-lg">
                  <span className="font-bold text-black">F</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Futura Labs</h3>
                  <p className="text-xs text-white/60">Designing tomorrow's digital experiences</p>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed">
                A modern creative studio that builds products with clean code, thoughtful
                interfaces and futuristic aesthetics. Let's shape what comes next.
              </p>

              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <a aria-label="Facebook" href="#" className="group w-9 h-9 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a aria-label="Twitter" href="#" className="group w-9 h-9 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a aria-label="Instagram" href="#" className="group w-9 h-9 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
                <div className="ml-2 text-xs text-white/60">Follow us</div>
              </div>
            </motion.div>
          </div>

          {/* Links menu */}
          <div className="md:col-span-5 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Product", links: ["Features", "Pricing", "Roadmap", "Integrations"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
              { title: "Resources", links: ["Blog", "Docs", "Community", "Support"] },
            ].map((col) => (
              <nav key={col.title} aria-label={col.title} className="space-y-3">
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-white inline-block transition">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Newsletter / Contact */}
          {/* <div className="md:col-span-3 lg:col-span-3">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="bg-gradient-to-br from-white/3 to-white/2 p-6 rounded-2xl border border-white/6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <h4 className="text-sm font-semibold">Stay ahead — newsletter</h4>
              <p className="text-xs text-white/70 mb-4">Short, monthly insights about product design & tech.</p>

              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input id="footer-email" type="email" required placeholder="you@company.com" className="flex-1 bg-transparent border border-white/8 rounded-lg px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00FFA3]/30" />
                <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-[#00FFA3] to-[#8A00FF] text-black font-semibold shadow-md hover:scale-[1.02] transition-transform">Subscribe</button>
              </form>

              <div className="mt-5 border-t border-white/6 pt-4 text-sm text-white/70 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@futuralabs.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 987-6543</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a href="#" className="hover:text-white">futuralabs.com</a>
                </div>
              </div>
            </motion.div>
          </div> */}
        </div>

        <div className="mt-10 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/60">© {new Date().getFullYear()} Futura Labs — Crafted with care</div>

          <div className="flex items-center gap-6">
            <div className="text-sm text-white/60 hidden sm:block">Legal</div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-sm text-white/70 hover:text-white">Privacy</a>
              <a href="#" className="text-sm text-white/70 hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[80vw] h-40 md:h-56 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(0,255,163,0.12), transparent), radial-gradient(circle at 80% 60%, rgba(138,0,255,0.08), transparent)' }} />
    </footer>
  );
}
