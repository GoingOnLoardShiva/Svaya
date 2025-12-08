"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import ProfileRender from './ProfileRender'

export default function ProfilePage() {
  const { username } = useParams(); // ✅ FIX
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const res = await axios.post("/api/individual-user", { username });

        if (!res.data?.user) {
          router.replace("/404");
          return;
        }

        setUser(res.data.user);
      } catch {
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username, router]);


  return (
    <div className="min-h-screen  flex justify-center  bg-black md:p-16">
      
      {/* <div className="bg-white p-6 rounded-xl shadow-md w-[350px] text-center">
        <img
          src={user.avatar || "/default-avatar.png"}
          className="w-24 h-24 rounded-full mx-auto"
          alt="avatar"
        />
        <h1 className="text-xl font-bold mt-4">{user.email}</h1>
        <p className="text-gray-500">@{user.username}</p>
        <p className="mt-3">{user.bio}</p>
      </div> */}
      <ProfileRender user={user}/>
    </div>
  );
}
