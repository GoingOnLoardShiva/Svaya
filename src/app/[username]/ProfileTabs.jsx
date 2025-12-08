"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import axios from "axios";

const TABS = [
  { value: "links", label: "Links" },
  { value: "socials", label: "Social" },
  { value: "about", label: "About" },
];

export default function ProfileTabs({ user }) {
  const [active, setActive] = useState("links");
  const [layoutData, setLayoudata] = useState([]);
  const userIdA = user.uuid;

  useEffect(() => {
    const getLayout = async function () {
      const res = await axios.post("/api/layout-routes/user-get-layout-data", {
        uuid: userIdA,
      });
      if (res.data) {
        setLayoudata(res.data);
      } else {
        return;
      }
    };
    getLayout();
  }, []);

  return (
    <Tabs value={active} onValueChange={setActive} className="w-full">
      {/* TAB HEADER */}
      <div className="relative">
        <TabsList
          className="
            relative w-full h-12 rounded-full
            bg-white/5 backdrop-blur
            p-1 flex overflow-hidden
          "
        >
          {TABS.map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "relative z-10 flex-1 rounded-full text-xs font-medium transition",
                "data-[state=active]:text-black",
                "data-[state=inactive]:text-white/70"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}

          {/* ✅ Animated Pill */}
          <AnimatedPill active={active} />
        </TabsList>
      </div>

      {/* CONTENT */}
      <div className="mt-6">
        <TabsContent value="links">
          <LinksSection layoutData={layoutData} />
        </TabsContent>
        <TabsContent value="socials">
          <SocialSection />
        </TabsContent>
        <TabsContent value="about">
          <AboutSection user={user} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
function AnimatedPill({ active }) {
  const index = active === "links" ? 0 : active === "socials" ? 1 : 2;

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className="
        absolute inset-y-1
        w-1/3
        rounded-full
        bg-white
        shadow-lg
      "
      style={{
        left: `calc(${index} * 100% / 3)`,
      }}
    />
  );
}

function LinksSection({ layoutData }) {
  const platformStyles = {
    Facebook: "bg-blue-600 hover:bg-blue-700",
    Instagram: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    Youtube: "bg-red-600 hover:bg-red-700",
    Website: "bg-white/10 hover:bg-white/20",
  };

  return (
    <div className="space-y-4">
      {layoutData.map((item, index) => (
        <motion.a
          key={item._id}
          href={item.platform_link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`
            block rounded-full px-6 py-3 text-center text-white font-medium
            shadow-lg backdrop-blur-md
            ${platformStyles[item.platform] || "bg-white/10"}
          `}
        >
          {item.platform_Tittle || item.platform}
        </motion.a>
      ))}
    </div>
  );
}

function SocialSection() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {["Instagram", "Twitter", "GitHub"].map((s, i) => (
        <div
          key={i}
          className="rounded-xl bg-white/5 py-4 text-center text-xs text-white"
        >
          {s}
        </div>
      ))}
    </div>
  );
}

function AboutSection({ user }) {
  return (
    <p className="text-sm text-white/70 text-center">
      Full-stack developer creating modern web experiences.
    </p>
  );
}
