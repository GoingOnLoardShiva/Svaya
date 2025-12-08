"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import axios from "axios";

/* ---------------- TABS ---------------- */
const TABS = [
  { value: "links", label: "Links" },
  { value: "app", label: "App" },
  { value: "shop", label: "Shop" },
];

/* ---------------- PLATFORM ICONS ---------------- */
const platformIcons = {
  Facebook: "/icons/facebook.svg",
  Instagram: "/icons/instagram.svg",
  Youtube: "/icons/youtube.svg",
  Website: "/icons/link.svg",
};

/* ---------------- TEMPLATE STYLES ---------------- */
const TEMPLATE_STYLES = {
  default: {
    tabsBg: "bg-white/10",
    pill: "bg-white",
    textActive: "text-black",
    textInactive: "text-white/70",
    cardBase: "bg-white/10 hover:bg-white/20",
  },

  glass: {
    tabsBg: "bg-white/5 backdrop-blur-xl border border-white/10",
    pill: "bg-white/30 backdrop-blur-xl",
    textActive: "text-white",
    textInactive: "text-white/60",
    cardBase:
      "bg-white/10 backdrop-blur-xl border border-white/10 hover:bg-white/20",
  },

  neon: {
    tabsBg: "bg-black border border-pink-500/40",
    pill: "bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_25px_#ec4899]",
    textActive: "text-white",
    textInactive: "text-pink-300",
    cardBase:
      "bg-black border border-pink-500/40 shadow-[0_0_15px_#ec4899] hover:shadow-[0_0_30px_#ec4899]",
  },
  minimal: {
    tabsBg: "bg-white",
    pill: "bg-black",
    textActive: "text-white",
    textInactive: "text-black/50",
    cardBase: "bg-white border border-black/10 text-black hover:bg-black/5",
    iconBg: "bg-black",
  },

  gradient: {
    tabsBg: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    pill: "bg-white/90",
    textActive: "text-black",
    textInactive: "text-white/80",
    cardBase:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90",
    iconBg: "bg-white",
  },

  creator: {
    tabsBg: "bg-black border border-yellow-400",
    pill: "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]",
    textActive: "text-black",
    textInactive: "text-yellow-300",
    cardBase:
      "bg-black border border-yellow-400 text-white shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:shadow-[0_0_30px_rgba(250,204,21,0.9)]",
    iconBg: "bg-yellow-400",
  },

  classic: {
    tabsBg: "bg-gray-200",
    pill: "bg-white shadow",
    textActive: "text-black",
    textInactive: "text-black/60",
    cardBase: "bg-white border border-gray-300 text-black hover:bg-gray-50",
    iconBg: "bg-gray-100",
  },
  luxury: {
    tabsBg: "bg-yellow-400 ",
    pill: "bg-black border border-yellow-500/40 shadow-lg",
    textActive: "text-yellow-400",
    textInactive: "text-yellow-400/50",
    cardBase:
      "bg-black border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10",
    iconBg: "bg-yellow-500/10 text-yellow-400",
  },
  softpastel: {
    tabsBg: "bg-white/60 backdrop-blur",
    pill: "bg-white shadow-sm",
    textActive: "text-indigo-600",
    textInactive: "text-zinc-500",
    cardBase:
      "bg-white border border-zinc-200 text-zinc-800 hover:bg-indigo-50",
    iconBg: "bg-indigo-100 text-indigo-600",
  },
};

/* ---------------- MAIN COMPONENT ---------------- */
export default function ProfileTabs({ user }) {
  const [active, setActive] = useState("links");
  const [layoutData, setLayoutData] = useState([]);

  const template =
    TEMPLATE_STYLES[user?.activeTemplateId] || TEMPLATE_STYLES.default;

  useEffect(() => {
    if (!user?.uuid) return;

    const getLayout = async () => {
      try {
        const res = await axios.post(
          "/api/layout-routes/user-get-layout-data",
          { uuid: user.uuid }
        );
        setLayoutData(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    getLayout();
  }, [user]);

  return (
    <Tabs value={active} onValueChange={setActive} className="w-full">
      {/* -------- TAB HEADER -------- */}
      <TabsList
        className={cn(
          "relative h-12 w-full rounded-full p-1 flex",
          template.tabsBg
        )}
      >
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "relative z-10 flex-1 rounded-full text-xs font-medium transition",
              "data-[state=active]:" + template.textActive,
              "data-[state=inactive]:" + template.textInactive
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}

        <AnimatedPill active={active} template={template} />
      </TabsList>

      {/* -------- CONTENT -------- */}
      <div className="mt-6">
        <TabsContent value="links">
          <LinksSection
            layoutData={layoutData}
            user={user}
            template={template}
          />
        </TabsContent>

        <TabsContent value="app">
          <AppSelection />
        </TabsContent>

        <TabsContent value="shop">
          <AboutSection />
        </TabsContent>
      </div>
    </Tabs>
  );
}

/* ---------------- ANIMATED PILL ---------------- */
function AnimatedPill({ active, template }) {
  const index = active === "links" ? 0 : active === "app" ? 1 : 2;

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn("absolute inset-y-1 w-1/3 rounded-full", template.pill)}
      style={{ left: `calc(${index} * 100% / 3)` }}
    />
  );
}

/* ---------------- LINKS SECTION ---------------- */
function LinksSection({ layoutData, user, template }) {
  const platformAccent = {
    Facebook: "border-blue-500",
    Instagram: "border-pink-500",
    Youtube: "border-red-500",
    Website: "border-white/30",
  };

  return (
    <div className="space-y-4">
      {layoutData.map((item, index) => (
        <motion.a
          key={item._id}
          href={item.platform_link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "flex items-center gap-4 rounded-2xl px-4 py-3 text-white transition",
            template.cardBase,
            platformAccent[item.platform]
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <img
              src={platformIcons[item.platform]}
              alt={item.platform}
              className="h-5 w-5"
            />
          </div>

          <span className="flex-1 text-sm font-medium">
            {item.platform_Tittle || item.platform}
          </span>

          <img
            src={user?.avatar || "/globe.svg"}
            alt="User Avatar"
            className="h-8 w-8 rounded-full border border-white/30 object-cover"
          />
        </motion.a>
      ))}
    </div>
  );
}

/* ---------------- APP TAB ---------------- */
function AppSelection() {
  const apps = ["Instagram", "Twitter", "GitHub"];

  return (
    <div className="grid grid-cols-3 gap-3">
      {apps.map((app) => (
        <div
          key={app}
          className="rounded-xl bg-white/5 py-4 text-center text-xs text-white hover:bg-white/10 transition"
        >
          {app}
        </div>
      ))}
    </div>
  );
}

/* ---------------- ABOUT TAB ---------------- */
function AboutSection() {
  return (
    <p className="text-center text-sm text-white/70">
      Full-stack developer creating modern web experiences.
    </p>
  );
}
