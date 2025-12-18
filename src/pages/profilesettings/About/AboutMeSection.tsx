import React from "react";
import { Pencil } from "lucide-react";

const AboutMeSection: React.FC = () => (
  <div>
    <div className='flex items-center justify-between mb-2'>
      <h3 className='text-base font-semibold text-gray-800'>About Me</h3>
      <button className='bg-white rounded-full p-1 shadow hover:bg-gray-100 transition'>
        <span className='sr-only'>Edit About Me</span>
        <Pencil className='w-4 h-4 text-gray-600' />
      </button>
    </div>
    <div className='text-gray-700 mb-2'>
      I am dedicated freelancer with 5 years of experience in Product designer,
      using different product design tools to deliver quality works to my
      clients. I have dedicated my time to improve my skills, by learning from
      various platforms in order to get better and stay up to date in my field.
      I have dedicated my time to improve my skills, by learning from various
      platforms in order to get better and stay up to date in my field. I have
      dedicated my time to improve my skills, by learning from various platforms
      in order to get better and stay up to date in my field.
      <span className='text-primary cursor-pointer'>Read more...</span>
    </div>
  </div>
);

export default AboutMeSection;
