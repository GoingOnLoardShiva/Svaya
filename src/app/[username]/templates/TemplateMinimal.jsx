import ProfileTabs from "../ProfileTabs";

export default function TemplateMinimal({ user }) {
  return (
    <div className="w-[360px] bg-white text-black p-5 rounded-xl">
      <div className="flex gap-3 items-center mb-4">
        <img src={user.avatar} className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-semibold">@{user.username}</h4>
          <p className="text-xs opacity-60">{user.category}</p>
        </div>
      </div>

      <ProfileTabs user={user} />
    </div>
  );
}
