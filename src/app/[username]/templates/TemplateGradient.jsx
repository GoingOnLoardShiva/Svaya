import ProfileTabs from "../ProfileTabs";

export default function TemplateGradient({ user }) {
  return (
    <div className="w-[380px] p-6 rounded-xl text-white
      bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <img
        src={user.avatar}
        className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-white"
      />
      <h3 className="text-center font-semibold">@{user.username}</h3>
      <p className="text-xs text-center opacity-80">{user.category}</p>

      <div className="mt-6 bg-black/30 p-3 rounded-xl">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
