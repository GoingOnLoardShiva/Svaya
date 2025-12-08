import ProfileTabs from "../ProfileTabs";

export default function TemplateNeon({ user }) {
  return (
    <div className="relative w-[380px] p-6 rounded-xl bg-black overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/30 blur-[150px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/30 blur-[150px]" />

      <div className="relative z-10 text-white text-center">
        <img src={user.avatar} className="w-24 h-24 rounded-full mx-auto mb-3 border border-white/20" />
        <h3 className="font-bold text-lg">@{user.username}</h3>
        <p className="text-xs opacity-70">{user.category}</p>

        <div className="mt-6">
          <ProfileTabs user={user} />
        </div>
      </div>
    </div>
  );
}
