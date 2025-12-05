"use client";

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import ProfileDrop from "./profile/ProfileDrop";
import { Button } from "@/components/ui//button";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Box,
  Users,
  ShoppingBag,
  TrendingUp,
  Megaphone,
} from "lucide-react";
import { MdElectricBolt } from "react-icons/md";
import axios from "axios";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Products", href: "/dashboard/product", icon: Box },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "Income", href: "/income", icon: TrendingUp },
    { name: "Promote", href: "/promote", icon: Megaphone },
  ];



  return (
    <SidebarProvider>
      <div className="flex bg-[#f6f6f6] min-h-screen w-full text-gray-800">
        {/* Sidebar */}
        <Sidebar className="flex flex-col">
          <SidebarHeader>
            <h1 className=" px-2 py-3">Savya</h1>
          </SidebarHeader>

          {/* Make this area flex + column so mt-auto works */}
          <SidebarContent className="flex flex-col h-full">
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>

              <SidebarMenu>
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link href={item.href} className="flex items-center">
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>

            {/* 👇 Move logout to bottom using mt-auto */}
            <SidebarFooter className="mt-auto mb-4 px-4">
              {/* <Button onClick={handleLogout} className="w-full">Logout</Button> */}
              <ProfileDrop/>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Navbar */}
          <header className="flex items-center justify-between bg-white p-4 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="font-semibold">Savya</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="py-2 px-4 rounded-full flex items-center gap-2 bg-gradient-to-r from-[#00FFA3] to-[#00A3FF] text-black font-semibold shadow-[0_0_15px_rgba(0,255,163,0.4)] ">
                <MdElectricBolt className="w-4 h-4" /> Upgrade
              </button>
              {/* <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-900"
              >
                Borders 
              </Button> */}

              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            </div>
          </header>

          <div className="p-4">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
