import React from 'react';

interface DateDividerProps {
  date: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => {
  return (
    <div className="flex items-center justify-center my-6">
      <span className="px-4 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
        {date}
      </span>
    </div>
  );
};

export default DateDivider;