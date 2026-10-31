import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import allnovaLogo from "../assets/AllNova black 2 (1).png";
import { Search, Bell, Settings, Plus } from "lucide-react";
import adminProfile from "../assets/demilade.png";
const AdminLayout = () => {
  return (
    <div className="relative flex min-h-screen bg-gray-50">

      {/* Admin Sidebar */}
      <div className="w-64 shrink-0 bg-[#100018] pt-20">
  <AdminNavbar />
</div>

      {/* Right Side Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Top Navigation Bar */}
        <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
{/* Allnova Logo */}
<div className="w-64 flex-shrink-0 flex items-center justify-center">
  <img
    src={allnovaLogo}
    alt="Allnova Logo"
    className="w-32 h-auto object-contain"
  />
</div>
          {/* Search Bar */}
<div className="relative w-full max-w-[576px] mx-auto">
  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
  />

  <input
    type="text"
    placeholder="Search Allnova..."
    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-purple-600"
  />
</div>

          {/* Right Side Icons */}
          <div className="ml-4 flex items-center gap-6">

           {/* Notifications */}
<button
  type="button"
  aria-label="Notifications"
  className="flex items-center justify-center text-gray-900"
>
  <Bell size={24} strokeWidth={1.8} />
</button>

            {/* Admin Profile */}
<div className="h-10 w-10 overflow-hidden rounded-full border-2 border-purple-100">
  <img
    src={adminProfile}
    alt="Admin Profile"
    className="h-full w-full object-cover object-top"
  />
</div>

            {/* Settings */}
            <button
  type="button"
  aria-label="Settings"
  className="flex items-center justify-center text-gray-500 hover:text-purple-700 transition-colors"
>
  <Settings size={24} strokeWidth={1.8} />
</button>

          </div>

        </header>

        {/* Dashboard Page Content */}
        <main className="min-w-0 flex-1 p-6 pt-24">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;