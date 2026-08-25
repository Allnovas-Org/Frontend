import { Outlet } from "react-router-dom";
import { Navbar } from "../components/dashboard/navbar/Navbar";
import { Sidebar } from "../components/dashboard/sidebar/Sidebar";

// TODO: replace with real auth/user context once wired up
const currentUser = { name: "Shemilore", avatarUrl: undefined };

export function DashboardLayout() {
  return (
    <div className="flex h-screen flex-col bg-white px-8 ">
      <Navbar userName={currentUser.name} avatarUrl={currentUser.avatarUrl} />
      <div className="flex flex-1 overflow-hidden py-">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
