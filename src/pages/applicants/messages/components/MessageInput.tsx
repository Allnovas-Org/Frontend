import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Smile, Mic, Send, FileText, Image } from 'lucide-react';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const attachmentRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (attachmentRef.current && !attachmentRef.current.contains(event.target as Node)) {
        setShowAttachmentMenu(false);
      }
    };

    if (showAttachmentMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAttachmentMenu]);

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      console.log('Send message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (type: 'files' | 'images') => {
    // Handle file selection
    console.log('Select:', type);
    setShowAttachmentMenu(false);
    // You can add file input logic here
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Attachment Button with Dropdown */}
        <div className="relative" ref={attachmentRef}>
          <button 
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          {/* Attachment Dropdown */}
          {showAttachmentMenu && (
            <div className="absolute bottom-full left-0 mb-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => handleFileSelect('files')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Files</span>
              </button>

              <button
                onClick={() => handleFileSelect('images')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-b-lg"
              >
                <Image className="w-4 h-4" />
                <span>Images</span>
              </button>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Emoji Button */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 hidden sm:block">
          <Smile className="w-5 h-5 text-gray-600" />
        </button>

        {/* Voice/Send Button */}
        {message.trim() ? (
          <button
            onClick={handleSend}
            className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;