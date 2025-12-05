"use client";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, BadgeCheck, User } from "lucide-react";

export default function ProfileDropdown({ children }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user data from localstorage
    const userData = JSON.parse(localStorage.getItem("usertoken_details"));
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  //Logout
  const handleLogout = async () => {
    // Implement logout functionality here
    const userConfirmed = confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      // Perform logout actions, e.g., clear auth tokens, redirect, etc.
      const res = await axios.post("/api/auth/logout");
      if (res.status === 200) {
        window.location.href = "/entry/login"; // Redirect to login page after logout
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer outline-none">
          <Avatar>
            <AvatarImage
              src="data:image/jpeg;base64,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"
              alt="Profile"
            />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>

          <div className="detail grid leading-tight items-start">
            <span className="font-medium">{username}</span>
            <span className="text-xs text-muted-foreground">Free</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel className="font-semibold">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" /> Account Settings
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BadgeCheck className="mr-2 h-4 w-4" /> Upgrade Plan
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
