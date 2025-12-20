import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div className='relative w-12 h-12'>
      <img
        src={src}
        alt={alt}
        className='w-12 h-12 rounded-full object-cover'
      />
      <img
        src='/images/applicants/verified.svg'
        alt='verified'
        className='absolute bottom-0 right-0 w-4 h-4 rounded-full '
      />
    </div>
  );
};

export default Avatar;
