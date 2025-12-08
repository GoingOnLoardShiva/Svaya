import ProfileTabs from "../ProfileTabs";

export default function TemplateSoftPastel({ user }) {
  return (
    <div className="w-[380px] p-6 rounded-2xl bg-gradient-to-br from-rose-100 to-indigo-100 text-zinc-800">
      <img src={user.avatar} className="w-20 h-20 mx-auto rounded-full shadow mb-3" />
      <h3 className="text-center font-semibold">@{user.username}</h3>
      <p className="text-center text-xs opacity-70">{user.category}</p>
      <div className="mt-6 bg-white rounded-xl p-3">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
