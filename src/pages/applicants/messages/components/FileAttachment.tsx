import React from 'react';
import { FileText, Download } from 'lucide-react';

interface FileAttachmentProps {
  fileName: string;
  fileSize: string;
  fileType: string;
  timestamp: string;
  isSent: boolean;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({
  fileName,
  fileSize,
  fileType,
  timestamp,
  isSent,
}) => {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] sm:max-w-md ${isSent ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-3 flex items-center gap-3 ${
            isSent
              ? 'bg-red-800 text-white rounded-tr-none'
              : 'bg-gray-100 text-gray-900 rounded-tl-none'
          }`}
        >
          {/* File Icon */}
          <div
            className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 ${
              isSent ? 'bg-white/20' : 'bg-white'
            }`}
          >
            <FileText className={`w-5 h-5 ${isSent ? 'text-white' : 'text-red-500'}`} />
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${isSent ? 'text-white' : 'text-gray-900'}`}>
              {fileName}
            </p>
            <p className={`text-xs ${isSent ? 'text-white/80' : 'text-gray-500'}`}>
              {fileSize} {fileType}
            </p>
          </div>

          {/* Download Button */}
          <button
            className={`p-2 rounded-full flex-shrink-0 ${
              isSent ? 'hover:bg-white/20' : 'hover:bg-gray-200'
            } transition-colors`}
          >
            <Download className={`w-4 h-4 ${isSent ? 'text-white' : 'text-gray-600'}`} />
          </button>
        </div>
        <span className={`text-xs text-gray-500 mt-1 block ${isSent ? 'text-right' : 'text-left'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default FileAttachment;