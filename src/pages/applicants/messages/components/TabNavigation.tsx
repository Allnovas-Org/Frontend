import React from 'react';

interface TabNavigationProps {
  activeTab: 'all' | 'unread' | 'pinned' | 'archived';
  onTabChange: (tab: 'all' | 'unread' | 'pinned' | 'archived') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'pinned', label: 'Pinned' },
    { id: 'archived', label: 'Archived' },
  ] as const;

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-red-800'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;