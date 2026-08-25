import { NavLink } from "react-router-dom";
import type { NavItem } from "../../../shared/types/dashboard";
import { NAV_ICON_STROKE_WIDTH } from "./sidebarConfig";
import { cn } from "../../../shared/utils/cn";

interface SidebarNavItemProps {
  item: NavItem;
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const { label, path, icon: Icon } = item;

  return (
    <NavLink
      to={path}
      end={path === "/dashboard"}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-center gap-3 rounded-lg px-4 py-2.5 text-xs transition-colors",
          isActive
            ? "bg-[#7800B3] text-white font-medium"
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
        )
      }
    >
      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
        <Icon
          size={18}
          strokeWidth={NAV_ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      </span>
      <span>{label}</span>
    </NavLink>
  );
}
