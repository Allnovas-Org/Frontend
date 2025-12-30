import React from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';
import VoiceMessage from './components/VoiceMessage';
import FileAttachment from './components/FileAttachment';
import DateDivider from './components/DateDivider';
import MessageInput from './components/MessageInput';
import { sampleConversations } from './data/conversations';

interface ConversationViewProps {
  onToggleProfile: () => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({ onToggleProfile }) => {
  const { id } = useParams<{ id: string }>();
  const conversation = sampleConversations.find((c) => c.id === Number(id));

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white mt-20">
        <p className="text-gray-500">Conversation not found</p>
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
            <img
              src={conversation.avatar}
              alt={conversation.userName}
              className="w-full h-full object-cover"
            />
          </button>
          <div>
            <h2 className="text-base font-semibold text-gray-900">{conversation.userName}</h2>
            <p className="text-sm text-gray-500">{conversation.userTitle}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <DateDivider date="Yesterday" />

        {conversation.messages.map((message) => {
          const isSent = message.senderId === 'me';

          if (message.type === 'text' && message.text) {
            return (
              <ChatMessage
                key={message.id}
                text={message.text}
                timestamp={message.timestamp}
                isSent={isSent}
              />
            );
          }

          if (message.type === 'voice' && message.voiceDuration) {
            return (
              <VoiceMessage
                key={message.id}
                duration={message.voiceDuration}
                timestamp={message.timestamp}
                isSent={isSent}
              />
            );
          }

          if (message.type === 'file' && message.fileName) {
            return (
              <FileAttachment
                key={message.id}
                fileName={message.fileName}
                fileSize={message.fileSize || '0 KB'}
                fileType={message.fileType || 'file'}
                timestamp={message.timestamp}
                isSent={isSent}
              />
            );
          }

          return null;
        })}

        <DateDivider date="Today" />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};
export default ConversationView;