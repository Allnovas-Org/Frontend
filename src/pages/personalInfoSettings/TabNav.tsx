import React from "react";
import { User, Briefcase, ShoppingBag, Star } from "lucide-react";
import { TabType } from "../../types";

interface TabNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Profile" as TabType, icon: <User size={18} /> },
    { name: "Portfolio" as TabType, icon: <Briefcase size={18} /> },
    { name: "Catalogue" as TabType, icon: <ShoppingBag size={18} /> },
    { name: "Review" as TabType, icon: <Star size={18} /> },
  ];

  return (
    <nav className='flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 p-2 sm:p-3 bg-white border border-gray-100 rounded-xl shadow-sm mb-6'>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm font-medium whitespace-nowrap ${
            activeTab === tab.name
              ? "bg-dark-purple text-white"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </nav>
  );
};

export default TabNav;
