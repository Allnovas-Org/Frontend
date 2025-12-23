import React from "react";
import { Star } from "lucide-react";
import { RatingStat } from "../../../types/review";

const stats: RatingStat[] = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 12 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 85 },
  { stars: 1, percentage: 85 },
];

const RatingSummary: React.FC = () => {
  return (
    <div className='flex flex-col md:flex-row items-start md:items-center gap-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm mb-6'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-gray-900'>4.9</h1>
        <div className='flex my-1'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className='w-5 h-5 fill-orange-500 text-orange-500' />
          ))}
        </div>
        <p className='text-sm text-gray-500 whitespace-nowrap'>
          Based on 127 Reviews
        </p>
      </div>
      <div className='flex-1 w-full space-y-2'>
        {stats.map((stat) => (
          <div key={stat.stars} className='flex items-center gap-4'>
            <span className='text-sm text-gray-600 w-3'>{stat.stars}</span>
            <Star className='w-4 h-4 text-orange-500 fill-orange-500' />
            <div className='flex-1 h-2 bg-gray-100 rounded-full overflow-hidden'>
              <div
                className='h-full bg-orange-500 rounded-full'
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
            <span className='text-sm text-gray-400 w-8'>
              {stat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
