import ProfileTabs from "../ProfileTabs";

export default function TemplateLuxury({ user }) {
  return (
    <div className="w-[380px] p-6 rounded-2xl bg-yellow-900 text-yellow-400 border border-yellow-500/30">
      <img src={user.avatar} className="w-20 h-20 mx-auto rounded-full border border-yellow-400 mb-2" />
      <h3 className="text-center font-semibold">@{user.username}</h3>
      <p className="text-center text-xs opacity-70">{user.category}</p>
      <div className="mt-6">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
