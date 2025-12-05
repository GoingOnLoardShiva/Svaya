


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./DashboardClient";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  // const token = cookieStore.get("auth_token")?.value;
  const token = cookieStore.get("auth_token")?.value;

  if (!token) redirect("/entry/login");

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    redirect("/entry/login");
  }

  return <DashboardClient user={user}>{children}</DashboardClient>;
}
