import React from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineImage } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AiOutlineDelete } from "react-icons/ai";

export default function MainLayout() {
  return (
    <div>
      <div className="main-layout-container">
        <div className="f-layout-component bg-white/70 backdrop-blur-md rounded-xl flex gap-4 p-4 shadow-sm border">
          <div className="first-icon"></div>
          <div className="layout-details-all gap-2 flex flex-col w-full">
            <div className="layout-details flex items-end justify-between w-full">
              <div className="space-y-2">
                <label className="p-0 m-0 text-red-500" htmlFor="">Youtube </label>
                {/* Title Row */}
                <div className="flex items-center gap-2">
                  <span className="font-bold">Ray Prime</span>
                  <BiSolidEditAlt className="w-4 h-4 cursor-pointer" />
                </div>

                {/* Link Row */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    http://youtube.com
                  </span>
                  <BiSolidEditAlt className="w-4 h-4 cursor-pointer" />
                </div>
              </div>

              {/* Switch aligned to the right */}
              <Switch id="airplane-mode" />
            </div>

            <div className="layout-tools flex items-center justify-between w-full">
              <div className="layout-tools-a flex items-center gap-4">
                <div className="logo-icon cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="logo-placeholder  rounded-full w-8 h-8 flex items-center justify-center">
                        <MdOutlineImage className="w-4 h-4 text-black" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Logo</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="logo-icon cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="logo-placeholder  rounded-full w-8 h-8 flex items-center justify-center">
                        <MdOutlineImage className="w-4 h-4 text-black" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add Logo</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <TooltipProvider>
                  <div className="logo-icon cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="logo-placeholder rounded-full  flex items-center justify-center gap-1 cursor-pointer">
                          <GiNetworkBars className="w-4 h-4 text-black" />
                          <span className="text-xs text-black">0 Click</span>
                        </div>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>Clicks</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
              <div className="delete-button">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="logo-placeholder rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                      <AiOutlineDelete className="w-4 h-4 text-red-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Link</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
