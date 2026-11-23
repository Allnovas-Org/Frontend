import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import {
  Conversation,
  Message,
  getConversation,
  listMessages,
  markConversationRead,
} from '../../../services/messaging.service';
import { getApiErrorMessage } from '../../../utils/apiError';
import { useAuthStore } from '../../../store/useAuthStore';

interface ConversationViewProps {
  onToggleProfile: () => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({ onToggleProfile }) => {
  const { id } = useParams<{ id: string }>();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setLoadError('');
    Promise.all([getConversation(id), listMessages(id), markConversationRead(id)])
      .then(([conversationResult, messagePage]) => {
        if (!active) return;
        setConversation(conversationResult);
        setMessages(messagePage.results);
      })
      .catch((error: unknown) => {
        if (active) {
          setLoadError(
            getApiErrorMessage(error, 'Unable to load this conversation.'),
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const userName = conversation
    ? `${conversation.other_user.first_name} ${conversation.other_user.last_name}`.trim() ||
      conversation.other_user.username
    : '';

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white mt-20">
        <p className="text-gray-500">Loading conversation…</p>
      </div>
    );
  }

  if (loadError || !conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white mt-20">
        <p role="alert" className="text-red-600">
          {loadError || 'Conversation not found'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white mt-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Clickable Avatar to toggle profile */}
          <button
            onClick={onToggleProfile}
            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <span className="flex h-full w-full items-center justify-center bg-gray-200 text-sm font-medium text-gray-700">
              {userName.slice(0, 1).toUpperCase()}
            </span>
          </button>
          <div>
            <h2 className="text-base font-semibold text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-500">{conversation.job_title}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            text={message.body}
            timestamp={new Date(message.created_at).toLocaleString()}
            isSent={message.sender_id === userId}
          />
        ))}
      </div>

      {/* Message Input */}
      <MessageInput
        conversationId={conversation.id}
        onSent={(message) => setMessages((current) => [...current, message])}
      />
    </div>
  );
};
export default ConversationView;