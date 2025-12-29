import React from 'react';
import { Play } from 'lucide-react';

interface VoiceMessageProps {
  duration: string;
  timestamp: string;
  isSent: boolean;
}

const VoiceMessage: React.FC<VoiceMessageProps> = ({ duration, timestamp, isSent }) => {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] sm:max-w-md ${isSent ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-3 flex items-center gap-3 ${
            isSent ? 'bg-red-800 rounded-tr-none' : 'bg-gray-100 rounded-tl-none'
          }`}
        >
          {/* Play Button */}
          <button className={`p-2 rounded-full flex-shrink-0 ${
            isSent ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors`}>
            <Play className={`w-4 h-4 ${isSent ? 'text-white' : 'text-gray-700'} fill-current`} />
          </button>

          {/* Waveform Placeholder */}
          <div className="flex items-center gap-0.5 flex-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-0.5 rounded-full ${isSent ? 'bg-white' : 'bg-gray-400'}`}
                style={{ height: `${Math.random() * 20 + 8}px` }}
              />
            ))}
          </div>

          {/* Duration */}
          <span className={`text-xs font-medium ${isSent ? 'text-white' : 'text-gray-700'}`}>
            {duration}
          </span>
        </div>
        <span className={`text-xs text-gray-500 mt-1 block ${isSent ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default VoiceMessage;