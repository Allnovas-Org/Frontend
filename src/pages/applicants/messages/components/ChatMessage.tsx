import React from 'react';

interface ChatMessageProps {
  text: string;
  timestamp: string;
  isSent: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, timestamp, isSent }) => {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] sm:max-w-md ${isSent ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isSent
              ? 'bg-red-800 text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-900 rounded-tl-none'
          }`}
        >
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <span className={`text-xs text-gray-500 mt-1 block ${isSent ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;