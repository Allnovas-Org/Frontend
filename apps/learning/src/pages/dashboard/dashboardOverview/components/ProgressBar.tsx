import React from 'react'

const ProgressBar = ({ progress, colorClass = "bg-purple-600" }: { progress: number, colorClass?: string }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs font-medium mb-1">
      <span className="text-gray-500 uppercase tracking-wider">Overall Progress</span>
      <span className="text-gray-900">{progress}%</span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-500 ${colorClass}`} 
        style={{ width: `${progress}%` }} 
      />
    </div>
  </div>
);

export default ProgressBar