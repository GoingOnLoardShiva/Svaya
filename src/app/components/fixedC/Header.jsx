"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 backdrop-blur-md border-b border-white/10
        ${scrolled ? "bg-[#060708]/70 shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FFA3] to-[#00A3FF] shadow-md flex items-center justify-center">
            <span className="font-bold text-black text-lg">S</span>
          </div>
          <span className="font-semibold tracking-wide text-[#00FFA3] text-lg">
            ScaleFlow
          </span>
        </motion.div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white font-bold">
          {[
            { name: "Product", href: "#product" },
            { name: "Features", href: "#features" },
            { name: "Pricing", href: "#pricing" },
            { name: "Customers", href: "#testimonials" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-[#00FFA3] transition duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/entry/login"
            className="px-4 py-2 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition"
          >
            Log in
          </a>
          <a
            href="/entry/signin"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] text-black font-bold shadow-[0_0_20px_rgba(0,255,163,0.4)] hover:scale-[1.03] transition-transform"
          >
            Get started
          </a>
        </div>

        {/* MOBILE MENU */}
        <MobileMenu />
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen((s) => !s)}
        aria-label="menu"
        className="p-2 text-white"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute right-4 top-16 w-[240px] bg-[#0A0A0F]/95 border border-white/10 rounded-xl shadow-2xl p-5 backdrop-blur-xl"
          >
            {[
              { name: "Product", href: "#product" },
              { name: "Features", href: "#features" },
              { name: "Pricing", href: "#pricing" },
              { name: "Customers", href: "#testimonials" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-white/80 hover:text-white hover:translate-x-1 transition"
              >
                {item.name}
              </a>
            ))}

            <div className="mt-4">
              <a
                href="/entry/login"
                className="block text-center py-2 rounded-full border border-white/10 text-white/80 hover:bg-white/10 transition"
              >
                Log in
              </a>
              <a
                href="/entry/signin"
                className="mt-2 block text-center py-2 rounded-full bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] text-black font-semibold shadow-[0_0_15px_rgba(0,255,163,0.4)]"
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}