import { SidebarNavItem } from "./SidebarNavItem";
import { primaryNavItems, secondaryNavItems } from "./sidebarConfig";

export function Sidebar() {
  return (
    <aside className="flex h-full w-72 flex-shrink-0 flex-col justify-between bg-white px-4">
      <div>
        <nav className="mt-8 flex flex-col items-stretch justify-start gap-3">
          {primaryNavItems.map((item) => (
            <SidebarNavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      <nav className="flex flex-col items-stretch justify-start gap-4">
        {secondaryNavItems.map((item) => (
          <SidebarNavItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
}
