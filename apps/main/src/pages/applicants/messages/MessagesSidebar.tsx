// src/pages/applicants/messages/MessagesSidebar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Edit, Pin, MessageSquare, MessagesSquare, Bookmark, Archive } from 'lucide-react';
import TabNavigation from './components/TabNavigation';
import MessageItem from './components/MessageItem';
import { Conversation, listConversations } from '../../../services/messaging.service';
import { getApiErrorMessage } from '../../../utils/apiError';

interface MessagesSidebarProps {
  activeConversationId?: string;
}

const MessagesSidebar: React.FC<MessagesSidebarProps> = ({ activeConversationId }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'pinned' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    listConversations()
      .then((page) => {
        if (active) setConversations(page.results);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(getApiErrorMessage(error, 'Unable to load conversations.'));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [activeConversationId]);

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
  const filteredConversations = conversations.filter((conv) => {
    if (activeTab === 'pinned' || activeTab === 'archived') return false;
    if (activeTab === 'unread') return conv.unreadCount > 0;
    return true;
  });

  // Further filter by search query
  const searchedConversations = filteredConversations.filter((conv) =>
    `${conv.other_user.first_name} ${conv.other_user.last_name} ${conv.job_title}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            disabled
            title="Start a conversation from an open job"
            aria-label="Compose message unavailable"
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="p-8 text-center text-sm text-gray-500">Loading conversations…</p>
        ) : loadError ? (
          <p role="alert" className="p-8 text-center text-sm text-red-600">
            {loadError}
          </p>
        ) : activeTab === 'pinned' || activeTab === 'archived' ? (
          <p className="p-8 text-center text-sm text-gray-500">
            Pinned and archived conversations are not available yet.
          </p>
        ) : searchedConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">
              {searchQuery ? 'No conversations found' : 'Conversations will appear here.'}
            </p>
          </div>
        ) : (
          searchedConversations.map((conversation) => (
            <MessageItem
              key={conversation.id}
              id={conversation.id}
              avatar=""
              userName={
                `${conversation.other_user.first_name} ${conversation.other_user.last_name}`.trim() ||
                conversation.other_user.username
              }
              lastMessage={
                conversation.latest_message?.body || conversation.job_title
              }
              timestamp={new Date(conversation.updated_at).toLocaleDateString()}
              unreadCount={conversation.unread_count}
              isActive={activeConversationId === conversation.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesSidebar;