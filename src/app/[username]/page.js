"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import ProfileRender from "./ProfileRender";

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
    <div className="relative min-h-[100svh] w-full flex justify-center bg-black pt-4 sm:pt-8 md:pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Lines */}
        <div
          className="absolute inset-0 opacity-10 
      bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)]
      bg-[size:40px_40px] sm:bg-[size:50px_50px] md:bg-[size:60px_60px]"
        />

        {/* Neon Blob Left */}
        <div
          className="absolute 
      -top-24 -left-24 
      w-[240px] h-[240px]
      sm:w-[320px] sm:h-[320px]
      md:w-[400px] md:h-[400px]
      bg-[#00FFA3]/30 blur-[120px] rounded-full"
        />

        {/* Neon Blob Right */}
        <div
          className="absolute 
      -bottom-28 -right-24 
      w-[260px] h-[260px]
      sm:w-[360px] sm:h-[360px]
      md:w-[450px] md:h-[450px]
      bg-[#8A00FF]/30 blur-[140px] rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl flex justify-center">
        <ProfileRender user={user} />
      </div>
    </div>
  );
}
