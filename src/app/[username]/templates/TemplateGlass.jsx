import ProfileTabs from "../ProfileTabs";

export default function TemplateGlass({ user }) {
  return (
    <div className="w-[380px] p-6 rounded-2xl bg-white/10 backdrop-blur text-white border border-white/20">
      <img src={user.avatar} className="w-20 h-20 mx-auto rounded-full mb-2" />
      <h3 className="text-center font-semibold">@{user.username}</h3>
      <p className="text-center text-xs opacity-60">{user.category}</p>

      <div className="mt-6">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
