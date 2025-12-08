"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCcw, Moon, Sun } from "lucide-react";

export default function PreviewPhone({ username, theme }) {
  const iframeRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState("light");

  // ✅ Auto refresh on theme / mode change
  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.src = `/${username}?theme=${theme}&mode=${mode}`;
  }, [theme, mode, username]);

  return (
    <div className="hidden md:flex justify-end w-full overflow-hidden">
      <div className="space-y-1">
        {/* Header */}
        <div className="flex justify-between items-center px-10">
          <span className="font-semibold">Live Preview</span>

          <div className="flex items-center gap-3">

            {/* Refresh */}
            <RefreshCcw
              className="w-5 h-5 cursor-pointer text-gray-600"
              onClick={() =>
                iframeRef.current?.contentWindow?.location.reload()
              }
            />
          </div>
        </div>

        {/* Scale Control */}
        <div className="px-10">
          <input
            type="range"
            min={0.7}
            max={1.2}
            step={0.05}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* ✅ Responsive Phone Preview */}
        <div
          className="relative mx-auto w-full max-w-fit lg:max-w-fit transition-transform"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Phone Frame */}
          <img
            src="/i-phone15.png"
            className="w-full relative z-20 pointer-events-none"
            alt="Phone"
          />

          {/* Screen Area */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div
              className="
            relative
            w-[84%]
            aspect-[9/19.5]
            rounded-3xl
            overflow-x-hidden
            bg-white
            
          "
            >
              {/* ✅ Fully Responsive iframe */}
              <iframe
                ref={iframeRef}
                src={`/${username}?theme=${theme}&mode=${mode}`}
                className="w-full h-full border-0 overflow-x-hidden"
                title="Live Profile Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
