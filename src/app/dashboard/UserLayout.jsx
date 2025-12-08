"use client";

import { PersonStanding, Plus, RefreshCcw, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import LinksTab from "./LinksTab";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MainLayout from "./component/MainLayout";
import PreviewPhone from "./component/PreviewPhone";

export default function Layout() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");

  //get userdetails form localstorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usertoken_details"));
    if (userData) {
      setUsername(userData.username);
    }
  }, []);
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  // ----------------- DESKTOP (CENTER DIALOG) -----------------
  // if (isDesktop) {
  //   return (
  //     <Dialog open={open} onOpenChange={setOpen}>
  //       <DialogTrigger asChild>
  //         <Button variant="outline">Edit Profile</Button>
  //       </DialogTrigger>

  //       <DialogContent className="sm:max-w-[425px]">
  //         <DialogHeader>
  //           <DialogTitle>Edit profile</DialogTitle>
  //           <DialogDescription>
  //             Make changes to your profile here. Click save when you're done.
  //           </DialogDescription>
  //         </DialogHeader>

  //         <ProfileForm />
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  // ----------------- MOBILE (DRAWER) -----------------
  return (
    <div className="w-full">
      <div
        className="
        main-user-view-container 
        flex flex-col md:flex-row 
        justify-between items-start 
        gap-10
      "
      >
        {/* USER + ADD BUTTON */}
        <div className="user-main-view-container m-0 p-0 w-full">
          <div className="user-details-component flex justify-between items-center w-full md:max-w-[450px] px-4 py-3">
            {/* USER INFO */}
            <div className="user-profile flex gap-3 items-center">
              <div className="user-img bg-gray-200 p-4 rounded-full">
                <User fill="black" />
              </div>

              <div className="user-details-text">
                <h3 className="text-2xl font-semibold">{username}</h3>
                <MdEmail className="w-5 h-5 text-gray-600 mt-1" />
              </div>
            </div>

            {/* DRAWER / DIALOG BUTTON */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="add-button flex px-5 py-3 items-center gap-2 bg-green-400 rounded-full hover:bg-green-500 transition">
                  <Plus className="w-5 h-5 text-gray-700" />
                  <span>Add</span>
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Layout</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>

                <ProfileForm />
              </DialogContent>
            </Dialog>
          </div>

          {/* MAIN LAYOUT VIEW */}
          <div className="layout-view-container w-full px-4 mt-4">
            <MainLayout />
          </div>
        </div>

        {/* PHONE PREVIEW */}
        <div className="preview-component hidden md:flex justify-center md:justify-end w-full">
          <div className="preview-main-componenet">

            {/* Phone */}
            <div className="preview-img  max-w-[350px]">
              <PreviewPhone username={username}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------- PROFILE FORM (OUTSIDE MAIN COMPONENT!) -----------------
function ProfileForm({ className }) {
  return (
    // <form className={cn("grid items-start gap-6", className)}>
    //   <div className="grid gap-3">
    //     <Label htmlFor="email">Email</Label>
    //     <Input type="email" id="email" defaultValue="shadcn@example.com" />
    //   </div>

    //   <div className="grid gap-3">
    //     <Label htmlFor="username">Username</Label>
    //     <Input id="username" defaultValue="@shadcn" />
    //   </div>

    //   <Button type="submit">Save changes</Button>
    // </form>
    <div>
      <LinksTab />
    </div>
  );
}
