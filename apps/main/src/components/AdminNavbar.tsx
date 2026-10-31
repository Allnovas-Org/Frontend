import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Building2,
  BriefcaseBusiness,
  BookOpen,
  ClipboardList,
  CreditCard,
  Wallet,
  UserCircle,
  ArrowLeftRight,
  MessageSquare,
  Award,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Students", path: "/admin/students", icon: GraduationCap },
  { name: "Freelancers", path: "/admin/freelancers", icon: Users },
  { name: "Recruiters/Clients", path: "/admin/clients", icon: Building2 },
  { name: "Projects", path: "/admin/projects", icon: BriefcaseBusiness },
  { name: "Courses", path: "/admin/courses", icon: BookOpen },
  { name: "Applications", path: "/admin/applications", icon: ClipboardList },
  { name: "Course/Internship Payments", path: "/admin/course-payments", icon: CreditCard },
  { name: "Freelancer Payments", path: "/admin/freelancer-payments", icon: Wallet },
  { name: "Profile", path: "/admin/profile", icon: UserCircle },
  { name: "Transactions", path: "/admin/transactions", icon: ArrowLeftRight },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  { name: "Certificates", path: "/admin/certificates", icon: Award },
];

const AdminNavbar = () => {
  return (
   <aside className="sticky top-20 h-[calc(100vh-80px)] w-64 shrink-0 overflow-y-auto bg-[#100018] p-5 text-white [scrollbar-width:thin] [scrollbar-color:#6b21a8_#100018]">
      

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
             `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                isActive
                  ? "bg-[#8700D4] text-white"
                  : "text-gray-300 hover:bg-purple-900"
              }`
            }
          >
  {item.icon && <item.icon size={18} />}
  <span>{item.name}</span>
</NavLink>
        ))}
      </nav>

      <div className="mt-12 border-t border-gray-700 pt-4">
        <NavLink
          to="/admin/settings"
          className="block px-4 py-3 text-sm text-gray-300"
        >
          Settings
        </NavLink>

        <button
          type="button"
          className="w-full text-left px-4 py-3 text-sm text-gray-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminNavbar;