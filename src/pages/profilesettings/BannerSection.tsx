import React from "react";
import { Pencil } from "lucide-react";

const BannerSection: React.FC = () => (
  <div className='relative w-full'>
    <img
      src='/images/applicants/prof-banner.png'
      alt='Profile banner'
      className='w-full h-60 object-cover'
    />
    {/* Banner Edit Pen */}
    <button className='absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition'>
      <span className='sr-only'>Edit Banner</span>
      <Pencil className='w-5 h-5 text-gray-600' />
    </button>
    {/* Profile Picture */}
    <div className='absolute -bottom-20 left-20 flex items-end'>
      <div className='relative'>
        <img
          src='/images/applicants/profile.png'
          alt='Profile'
          className='w-32 h-32 rounded-full border-4 border-white bg-white object-cover shadow'
        />
        {/* Verified Icon */}
        <span className='absolute bottom-2 right-2'>
          <img
            src='/images/applicants/verified.svg'
            alt='Verified'
            className='w-7 h-7'
          />
        </span>
      </div>
      <div className='ml-6 mb-4'>
        <div className='flex items-center gap-2'>
          <h2 className='text-2xl font-bold text-gray-900'>John Doe</h2>
          {/* Edit Pen */}
          <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
            <span className='sr-only'>Edit Name</span>
            <Pencil className='w-4 h-4 text-gray-600' />
          </button>
        </div>
        <div className='text-gray-500 text-sm'>Frontend Developer</div>
      </div>
    </div>
  </div>
);

export default BannerSection;
