import React, { ReactNode } from "react";

export const SuccessBanner: React.FC = () => (
  <div className='bg-light-green text-green px-6 py-2 rounded-lg mb-6 flex items-center gap-1'>
    <div className='flex items-center gap-3'>
      <img
        src='/images/applicants/tickcircle.svg'
        alt='success'
        className='w-6 h-6'
      />
      <span className='font-medium text-green text-sm'>
        Your proposal was successfully submitted. You’ll be notified if hired.
        Good job!
      </span>
    </div>
    <a
      href='/applicants/find-jobs'
      className='text-green underline font-normal text-sm'
    >
      Explore more opportunities
    </a>
  </div>
);

export const SectionTitle: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <h3 className='text-lg font-medium text-heading mb-2 mt-4'>{children}</h3>
);

// light badges
export const Badge: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className='px-1.5 py-0.2 rounded-lg text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200 ml-1'>
    {children}
  </span>
);

export const DescriptionList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className='list-disc pl-5 mb-2'>
    {items.map((item, idx) => (
      <li key={idx} className='text-sm text-text mb-1'>
        {item}
      </li>
    ))}
  </ul>
);

export const InfoBadge: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className='px-3 py-1 rounded-full bg-gray-light text-gray-dark text-xs font-medium'>
    {children}
  </span>
);
