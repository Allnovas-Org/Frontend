import React from 'react';
import { useParams } from 'react-router-dom';
import { Bell, Search, Info, Download, X } from 'lucide-react';
import { sampleConversations } from './data/conversations';

interface ProfilePanelProps {
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const conversation = sampleConversations.find((c) => c.id === Number(id));

  if (!conversation) return null;

  return (
    <div className="w-full sm:w-80 lg:w-96 bg-white border-l border-gray-200 overflow-y-auto mt-20 h-[calc(100vh-5rem)]">
      {/* Close Button - Visible on mobile/tablet */}
      <div className="lg:hidden p-4 border-b border-gray-200 flex justify-end">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="p-6 text-center border-b border-gray-200">
        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
          <img
            src={conversation.avatar}
            alt={conversation.userName}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{conversation.userName}</h2>
        <p className="text-sm text-gray-500 mb-4">{conversation.userTitle}</p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Info className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Images Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Images</h3>
          <button className="text-xs text-red-500 hover:text-red-600 font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {conversation.sharedImages.slice(0, 8).map((image, index) => (
            <div key={index} className="aspect-square bg-gray-100 rounded overflow-hidden">
              <img src={image} alt={`Shared ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Files Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Files</h3>
          <button className="text-xs text-red-500 hover:text-red-600 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {conversation.sharedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-gray-600">DOC</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Download className="w-3 h-3" />
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Links</h3>
          <button className="text-xs text-red-500 hover:text-red-600 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {conversation.sharedLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-gray-600">
                  {link.platform.substring(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{link.platform}</p>
                <p className="text-xs text-gray-500 truncate">{link.url}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;