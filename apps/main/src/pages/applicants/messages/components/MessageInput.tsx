import React, { useState } from 'react';
import { Paperclip, Smile, Mic, Send } from 'lucide-react';
import { Message, sendMessage } from '../../../../services/messaging.service';
import { getApiErrorMessage } from '../../../../utils/apiError';

interface MessageInputProps {
  conversationId: string;
  onSent: (message: Message) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ conversationId, onSent }) => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSend = async () => {
    const body = message.trim();
    if (body && !sending) {
      setSending(true);
      setSendError('');
      try {
        const sentMessage = await sendMessage(conversationId, body);
        onSent(sentMessage);
        setMessage('');
      } catch (error) {
        setSendError(getApiErrorMessage(error, 'Unable to send this message.'));
      } finally {
        setSending(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {sendError ? (
        <p role="alert" className="mb-2 text-sm text-red-600">{sendError}</p>
      ) : null}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Attachment Button */}
        <div className="relative">
          <button 
            disabled
            title="Attachments are not available yet"
            aria-label="Attachments unavailable"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
          >
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Emoji Button */}
        <button disabled title="Emoji support is not available yet" className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 hidden sm:block disabled:opacity-50">
          <Smile className="w-5 h-5 text-gray-600" />
        </button>

        {/* Voice/Send Button */}
        {message.trim() ? (
          <button
            onClick={() => void handleSend()}
            disabled={sending}
            className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button disabled title="Voice messages are not available yet" className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0 disabled:opacity-50">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageInput;