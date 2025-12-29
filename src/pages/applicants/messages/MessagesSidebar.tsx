// src/pages/applicants/messages/MessagesSidebar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Edit, Pin, MessageSquare, MessagesSquare, Bookmark, Archive } from 'lucide-react';
import TabNavigation from './components/TabNavigation';
import MessageItem from './components/MessageItem';
import { sampleConversations } from './data/conversations';

interface MessagesSidebarProps {
  activeConversationId?: number;
}

const MessagesSidebar: React.FC<MessagesSidebarProps> = ({ activeConversationId }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'pinned' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    if (showFilterDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  const handleFilterSelect = (filter: 'all' | 'unread' | 'pinned' | 'archived') => {
    setActiveTab(filter);
    setShowFilterDropdown(false);
  };

  // Filter conversations based on active tab
  const filteredConversations = sampleConversations.filter((conv) => {
    if (activeTab === 'pinned') return conv.isPinned;
    if (activeTab === 'archived') return conv.isArchived;
    if (activeTab === 'unread') return conv.unreadCount > 0;
    return !conv.isArchived; // 'all' shows everything except archived
  });

  // Further filter by search query
  const searchedConversations = filteredConversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate pinned and regular messages
  const pinnedMessages = searchedConversations.filter((conv) => conv.isPinned);
  const regularMessages = searchedConversations.filter((conv) => !conv.isPinned);

  return (
    <div className="w-full sm:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col mt-20 h-[calc(100vh-5rem)]">
      {/* Tabs */}
      <div className="flex-shrink-0">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Search and Actions */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Filter Button with Dropdown */}
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>

            {/* Filter Dropdown */}
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleFilterSelect('all')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    activeTab === 'all' ? 'bg-gray-50 text-red-800' : 'text-gray-700'
                  }`}
                >
                  <MessagesSquare className="w-4 h-4" />
                  <span>All chats</span>
                </button>

                <button
                  onClick={() => handleFilterSelect('unread')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    activeTab === 'unread' ? 'bg-gray-50 text-red-800' : 'text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Unread</span>
                </button>

                <button
                  onClick={() => handleFilterSelect('pinned')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    activeTab === 'pinned' ? 'bg-gray-50 text-red-800' : 'text-gray-700'
                  }`}
                >
                  <Pin className="w-4 h-4" />
                  <span>Pinned</span>
                </button>

                <button
                  onClick={() => handleFilterSelect('archived')}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors rounded-b-lg ${
                    activeTab === 'archived' ? 'bg-gray-50 text-red-800' : 'text-gray-700'
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  <span>Archived</span>
                </button>
              </div>
            )}
          </div>

          {/* Compose Button */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Messages Section */}
        {pinnedMessages.length > 0 && activeTab !== 'pinned' && (
          <div>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
              <Pin className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">Pinned Messages</span>
            </div>
            {pinnedMessages.map((conversation) => (
              <MessageItem
                key={conversation.id}
                id={conversation.id}
                avatar={conversation.avatar}
                userName={conversation.userName}
                lastMessage={conversation.lastMessage}
                timestamp={conversation.timestamp}
                unreadCount={conversation.unreadCount}
                isActive={activeConversationId === conversation.id}
              />
            ))}
          </div>
        )}

        {/* All Messages Section */}
        {regularMessages.length > 0 && activeTab !== 'pinned' && (
          <div>
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">All Messages</span>
            </div>
            {regularMessages.map((conversation) => (
              <MessageItem
                key={conversation.id}
                id={conversation.id}
                avatar={conversation.avatar}
                userName={conversation.userName}
                lastMessage={conversation.lastMessage}
                timestamp={conversation.timestamp}
                unreadCount={conversation.unreadCount}
                isActive={activeConversationId === conversation.id}
              />
            ))}
          </div>
        )}

        {/* Show all when pinned tab is active */}
        {activeTab === 'pinned' && pinnedMessages.map((conversation) => (
          <MessageItem
            key={conversation.id}
            id={conversation.id}
            avatar={conversation.avatar}
            userName={conversation.userName}
            lastMessage={conversation.lastMessage}
            timestamp={conversation.timestamp}
            unreadCount={conversation.unreadCount}
            isActive={activeConversationId === conversation.id}
          />
        ))}

        {/* Empty State for Sidebar */}
        {searchedConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">
              {searchQuery ? 'No conversations found' : 'Conversations will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesSidebar;