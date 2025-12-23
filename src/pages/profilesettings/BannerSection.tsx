import React from "react";
import { Pencil, ArrowRight } from "lucide-react";

const BannerSection: React.FC = () => (
  <div className='w-full'>
    {/* Banner */}
    <div className='relative w-full'>
      <img
        src='/images/applicants/prof-banner.png'
        alt='Profile banner'
        className='w-full h-40 sm:h-60 object-cover'
      />
      {/* Banner Edit Pen */}
      {/* <button className='absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition'>
        <span className='sr-only'>Edit Banner</span>
        <Pencil className='w-5 h-5 text-gray-600' />
      </button> */}
    </div>
    <div className='flex flex-col md:flex-row gap-6 md:gap-8 px-4 md:px-20 -mt-16'>
      <div className='flex flex-col items-center w-full md:w-1/5 min-w-[8rem] mb-4 md:mb-0'>
        <div className='relative'>
          <img
            src='/images/applicants/profile.png'
            alt='Profile'
            className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white object-cover shadow'
          />
          {/* Verified Icon */}
          <span className='absolute bottom-2 right-2'>
            <img
              src='/images/applicants/verified.svg'
              alt='Verified'
              className='w-6 h-6 sm:w-7 sm:h-7'
            />
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default BannerSection;
