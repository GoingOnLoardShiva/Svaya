import ProfileTabs from "../ProfileTabs";

export default function TemplateClassic({ user }) {
  return (
    <div className="w-[380px] bg-black text-white rounded-xl p-6 text-center">
      <img
        src={user.avatar}
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />
      <h3 className="font-semibold">@{user.username}</h3>
      <p className="text-xs text-white/60">{user.category}</p>

      <div className="mt-6">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
