// app/api/logout/route.js
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Clear cookie
  cookieStore.set({
    name: "auth_token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return Response.json({ success: true, message: "Logged out" });
}
