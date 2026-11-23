import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MessageItemProps {
  id: string;
  avatar: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isActive?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  id,
  avatar,
  userName,
  lastMessage,
  timestamp,
  unreadCount,
  isActive = false,
}) => {
  const navigate = useNavigate();
  const basePath = window.location.pathname.startsWith("/clients")
    ? "/clients/messages"
    : "/applicants/messages";

  const handleClick = () => {
    navigate(`${basePath}/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
        isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        {avatar ? (
          <img src={avatar} alt={userName} className="w-full h-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-gray-200 text-sm font-medium text-gray-700">
            {userName.slice(0, 1).toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">{userName}</h3>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{lastMessage}</p>
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-white">{unreadCount}</span>
        </div>
      )}
    </div>
  );
};

export default MessageItem;