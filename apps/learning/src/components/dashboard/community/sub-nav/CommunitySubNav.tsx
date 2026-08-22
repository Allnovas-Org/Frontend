import { communitySubNavItems } from "./communitySubNavConfig";
import { CommunitySubNavItem } from "./CommunitySubNavItem";

export function CommunitySubNav() {
  return (
    <nav
      className="flex flex-shrink-0 gap-2 overflow-x-auto px-4 py-3
                 sm:flex-col sm:gap-2 sm:overflow-visible sm:px-0 sm:py-0
                 sm:w-56 sm:flex-shrink-0"
    >
      {communitySubNavItems.map((item) => (
        <CommunitySubNavItem key={item.path} item={item} />
      ))}
    </nav>
  );
}
