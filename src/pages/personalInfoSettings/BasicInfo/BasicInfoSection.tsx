import React from "react";
import { Pencil } from "lucide-react";

const BasicInfoSection: React.FC = () => (
  <div className='w-full lg:w-full pr-0 border-none lg:border-r lg:border-gray-200 mb-6 lg:mb-0 flex-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-3 relative shadow-sm'>
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2'>
      <div>
        <p className='text-xs text-gray-500'>Location</p>
        <p className='text-sm text-gray-900 font-medium'>Nigeria</p>
      </div>
      <button className='bg-gray-100 rounded-full p-2 text-gray-400 hover:text-gray-600 transition-colors'>
        <span className='sr-only'>Edit Basic Info</span>
        <Pencil size={14} />
      </button>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Language</p>
      <p className='text-sm text-gray-900 font-medium'>
        English, French, German
      </p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Average hourly rate</p>
      <p className='text-sm text-gray-900 font-medium'>$40/hour</p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Total Job Completed</p>
      <p className='text-sm text-gray-900 font-medium'>40 Jobs Completed</p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Recommendations</p>
      <p className='text-sm text-gray-900 font-medium'>120 recommendations</p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Education</p>
      <p className='text-sm text-gray-900 font-medium'>
        Obafemi Awolowo University
      </p>
      <p className='text-xs text-gray-500'>Bsc certificate</p>
    </div>
    <div className='mb-4'>
      <p className='text-xs text-gray-500'>Udemy</p>
      <p className='text-sm text-gray-900 font-medium'>
        UI beginners certificate
      </p>
    </div>
  </div>
);

export default BasicInfoSection;
