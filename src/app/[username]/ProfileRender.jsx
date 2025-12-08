import React from "react";
import { CiShare1 } from "react-icons/ci";
import ProfileTabs from "./ProfileTabs";

export default function ProfileRender({user}) {
    if(!user) return null
  return (
    <div className="relative bg-[#02040A] p-6 rounded-xl shadow-md w-[380px] text-center overflow-hidden">
      
      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10 
          bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)]
          bg-[size:60px_60px]"
        />

        {/* Neon blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#00FFA3]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[450px] h-[450px] bg-[#8A00FF]/20 blur-[140px] rounded-full" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 profile-render-container">
        
        {/* Header */}
        <div className="render-header flex items-center justify-between text-white mb-4">
          <button className="flex items-center gap-1 text-xs opacity-80 hover:opacity-100 cursor-pointer">
            <CiShare1 className="text-lg" />
            Share
          </button>
        </div>

        {/* Main layout */}
        <div className="main-render-layout text-white">
          {/* Your profile layout goes here */}
          <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-3" />

          <h3 className="font-semibold">@{user.username}</h3>
          <p className="text-xs text-white/60 mt-1">
            {user.category}
          </p>
        </div>

      </div>
      <div className="layout-tab-section py-8">
        <ProfileTabs user={user}/>
      </div>
    </div>
  );
}
