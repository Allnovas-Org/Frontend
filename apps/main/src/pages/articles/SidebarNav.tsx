import React from "react";
import { SidebarItem } from "../../types";

interface SidebarNavProps {
  items?: SidebarItem[];
  activeId?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  items = [],
  activeId = "",
}) => {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <aside className='hidden lg:block w-64 sticky top-24 h-fit'>
      <nav className='space-y-2 text-sm'>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
              activeId === item.id
                ? "font-semibold text-primary bg-red-50"
                : "text-gray-dark hover:text-gray-darker hover:bg-gray-lighter"
            }`}
            aria-current={activeId === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarNav;
