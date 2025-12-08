import { CiShare1 } from "react-icons/ci";
import ProfileTabs from "../ProfileTabs";

export default function TemplateDefault({ user }) {
  return (
    <div className="relative bg-[#02040A] p-6 rounded-xl w-[380px] text-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),
      linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)]
      bg-[size:60px_60px]" />

      <div className="relative z-10 text-white">
        <div className="flex justify-between mb-4">
          <button className="flex items-center gap-1 text-xs opacity-80">
            <CiShare1 /> Share
          </button>
        </div>

        <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-3" />
        <h3 className="font-semibold">@{user.username}</h3>
        <p className="text-xs text-white/60">{user.category}</p>

        <div className="py-8">
          <ProfileTabs user={user} />
        </div>
      </div>
    </div>
  );
}
