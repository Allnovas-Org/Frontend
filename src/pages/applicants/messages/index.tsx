import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import MessagesSidebar from './MessagesSidebar.tsx';
import MessagesEmpty from './MessagesEmpty.tsx';
import ConversationView from './ConversationView.tsx';
import ProfilePanel from './ProfilePanel.tsx';

const MessagesContent: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <MessagesSidebar activeConversationId={id ? Number(id) : undefined} />

      {/* Main Content */}
      {id ? (
        <>
          <ConversationView onToggleProfile={toggleProfile} />
          
          {/* Profile Panel - Shows on all screen sizes when toggled */}
          {showProfile && (
            <>
              {/* Mobile/Tablet Overlay */}
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={closeProfile}
              />
              
              {/* Profile Panel */}
              <div className={`
                fixed lg:relative
                right-0 top-0
                z-50 lg:z-0
                ${showProfile ? 'block' : 'hidden lg:block'}
              `}>
                <ProfilePanel onClose={closeProfile} />
              </div>
            </>
          )}
        </>
      ) : (
        <MessagesEmpty />
      )}
    </div>
  );
};

const Messages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MessagesContent />} />
      <Route path="/:id" element={<MessagesContent />} />
    </Routes>
  );
};

export default Messages;