import { NavLink } from "react-router-dom";
import type { CommunityNavItem } from "../../../../shared/types/community";
import { cn } from "../../../../shared/utils/cn";

interface CommunitySubNavItemProps {
  item: CommunityNavItem;
}

export function CommunitySubNavItem({ item }: CommunitySubNavItemProps) {
  const { label, path, icon: Icon } = item;

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors",
          "sm:flex-shrink sm:gap-3",
          isActive
            ? "border border-[#7800B3] bg-white font-medium text-[#7800B3]"
            : "border border-transparent text-gray-500 hover:bg-gray-50"
        )
      }
    >
      <Icon size={18} weight="regular" aria-hidden="true" />
      <span className="whitespace-nowrap">{label}</span>
    </NavLink>
  );
}
