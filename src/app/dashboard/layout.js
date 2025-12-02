// app/dashboard/layout.js
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({ children }) {
  // 1. READ COOKIE ON SERVER
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login"); // no token → no access
  }

  // 2. VERIFY TOKEN
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
    // user = { id: "...", role: "user", iat, exp }
  } catch (err) {
    redirect("/login"); // token expired or invalid
  }

  // 3. OPTIONAL ROLE-BASED LOGIC FOR UI
  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ───────────────────────────────
          SIDEBAR
      ─────────────────────────────── */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <ul className="space-y-4">
          <li>
            <a href="/dashboard">Home</a>
          </li>
          <li>
            <a href="/dashboard/profile">Profile</a>
          </li>

          {isAdmin && (
            <>
              <hr className="border-gray-700 my-3" />
              <li className="text-red-400 font-semibold">Admin Options</li>
              <li>
                <a href="/admin">Admin Panel</a>
              </li>
            </>
          )}

          {/* 🔥 LOGOUT BUTTON */}
          <li className="pt-6">
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </form>
          </li>
        </ul>
      </aside>

      {/* ───────────────────────────────
          MAIN CONTENT
      ─────────────────────────────── */}
      <main className="flex-1 p-8">
        {/* Inject user info into the layout context if needed */}
        <div className="mb-4 text-gray-700">
          Logged in as:
          <span className="font-semibold ml-1 capitalize">{user.role}</span>
        </div>

        {children}
      </main>
    </div>
  );
}
