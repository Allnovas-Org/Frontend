import React from "react";
import { Pencil } from "lucide-react";

const BasicInfoSection: React.FC = () => (
  <div className='w-1/5 pr-8 border-r border-gray-200'>
    <div className='flex items-start justify-between mb-4'>
      <div>
        <p className='text-xs text-gray-500'>Location</p>
        <p className='text-sm text-gray-900 font-medium'>Nigeria</p>
      </div>
      <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
        <span className='sr-only'>Edit Basic Info</span>
        <Pencil className='w-4 h-4 text-gray-600' />
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
