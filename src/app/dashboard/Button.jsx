import React from "react";

export default function UpgradeButton({ children = "Upgrade", onClick, className = "", size = "md" }) {
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
  };

  return (
    <button
      onClick={onClick}
      className={`relative group ${sizes[size]} ${className}`}
    >
      {/* Animated border layer */}
      <span className="absolute inset-0 rounded-xl p-[2px] bg-[conic-gradient(from_0deg,_#ff6b6b,_#f7d154,_#4cd964,_#5ac8fa,_#af52de,_#ff6b6b)] animate-spin-slow" />

      {/* Inner button background */}
      <span className="relative block w-full h-full rounded-xl bg-white dark:bg-slate-900 text-black dark:text-white flex items-center justify-center font-semibold">
        {children}
      </span>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}