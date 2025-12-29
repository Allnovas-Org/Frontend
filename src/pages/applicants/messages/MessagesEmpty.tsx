import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

const MessagesEmpty: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-white p-4 sm:p-8">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          A blank canvas... for your messages
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
          You haven't started a chat yet. Once you connect with a client, you'll be able to chat and collaborate here seamlessly.
        </p>

        {/* CTA Button */}
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
          <span className="text-sm font-medium">Browse openings</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MessagesEmpty;