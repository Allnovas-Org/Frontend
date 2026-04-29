import React from 'react';
import { Calendar } from 'lucide-react';

const ActivityChart = () => {
  const data = [
    { day: 'Mon', hours: 40, active: false },
    { day: 'Tue', hours: 35, active: false },
    { day: 'Wed', hours: 65, active: false },
    { day: 'Thu', hours: 45, active: false },
    { day: 'Fri', hours: 95, active: true }, // Highlighted day
    { day: 'Sat', hours: 50, active: false },
    { day: 'Sun', hours: 75, active: false },
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-bold text-[#3D4071] mb-2">Activity</h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-[#1A1C3D]">24,9</span>
            <span className="text-sm font-medium text-gray-400">Hours spent</span>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">
          <Calendar size={14} />
          last 7 days
        </button>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 mt-12">
        {/* The 5.2 Hours Dashed Line & Tooltip */}
        <div className="absolute top-[35%] w-full flex items-center z-10">
          <div className="flex-1 border-t-2 border-dashed border-gray-300" />
          <div className="bg-black text-white px-3 py-1 rounded-lg text-xs font-bold mx-2">
            5.2 hours
          </div>
          <div className="flex-1 border-t-2 border-dashed border-gray-300" />
        </div>

        {/* Bars Container */}
        <div className="absolute bottom-0 w-full h-full flex items-end justify-between px-2 gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              {/* Bar */}
              <div 
                style={{ height: `${item.hours}%` }}
                className={`w-full max-w-[45px] rounded-t-xl transition-all duration-300 cursor-pointer ${
                  item.active 
                    ? 'bg-[#6D11B1] shadow-lg shadow-purple-200' 
                    : 'bg-[#DEDCFF] hover:bg-[#CDC9FF]'
                }`}
              />
              {/* Day Label */}
              <span className={`mt-4 text-[10px] font-bold uppercase tracking-wider ${
                item.active ? 'text-[#1A1C3D]' : 'text-gray-400'
              }`}>
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;