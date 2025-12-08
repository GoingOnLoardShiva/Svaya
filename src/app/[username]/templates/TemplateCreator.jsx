import ProfileTabs from "../ProfileTabs";

export default function TemplateCreator({ user }) {
  return (
    <div className="w-[380px] bg-gradient-to-br from-indigo-500 to-pink-500 p-6 rounded-xl text-white">
      <img src={user.avatar} className="w-20 h-20 mx-auto rounded-full mb-2 border-2 border-white" />
      <h3 className="text-center font-semibold">@{user.username}</h3>
      <p className="text-center text-xs opacity-80">{user.category}</p>

      <div className="mt-6 bg-black/30 p-3 rounded-xl">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
