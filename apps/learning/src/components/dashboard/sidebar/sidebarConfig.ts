import {
  LayoutDashboard,
  Map,
  BookOpen,
  Bookmark,
  Users,
  Briefcase,
  Wallet,
  MessageSquare,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import type { NavItem } from "../../../shared/types/dashboard";

// Default stroke width applied everywhere sidebar/nav icons are rendered.
// Change this one value to make every nav icon thicker/thinner at once.
export const NAV_ICON_STROKE_WIDTH = 1.5;

export const primaryNavItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Career Map", path: "/dashboard/career-map", icon: Map },
  { label: "Course", path: "/dashboard/course", icon: BookOpen },
  { label: "Bookmark", path: "/dashboard/bookmark", icon: Bookmark },
  { label: "Community", path: "/dashboard/community", icon: Users },
  { label: "Internship", path: "/dashboard/internship", icon: Briefcase },
  { label: "Earning", path: "/dashboard/earning", icon: Wallet },
  { label: "Message", path: "/dashboard/message", icon: MessageSquare },
  { label: "Profile", path: "/dashboard/profile", icon: User },
];

export const secondaryNavItems: NavItem[] = [
  { label: "Settings", path: "/dashboard/settings", icon: Settings },
  { label: "Logout", path: "/logout", icon: LogOut },
];
