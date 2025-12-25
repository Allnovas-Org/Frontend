import React from "react";

interface ReviewStepValues {
  title: string;
  description: string;
  tags: string[];
  images: { file: File; title: string }[];
}

interface ReviewStepProps {
  values: ReviewStepValues;
}

const ReviewStep = ({ values }: ReviewStepProps) => (
  <div>
    <div className='mb-4'>
      <div className='font-semibold text-lg mb-2'>Review and Save</div>
      <div className='mb-2'>
        <span className='font-medium'>Project Title:</span>
        <p className='text-gray-input'>{values.title}</p>
      </div>
      <div className='mb-2'>
        <span className='font-medium'>Project Description:</span>
        <p className='text-gray-input'>{values.description}</p>
      </div>
      {/* <div className='mb-2'>
        <span className='font-medium'>Start:</span>
        <p className='text-gray-input'>
          {values.startMonth} {values.startYear}
        </p>
      </div>
      <div className='mb-2'>
        <span className='font-medium'>End:</span>
        <p className='text-gray-input'>
          {values.endMonth} {values.endYear}
        </p>
      </div> */}
      <div className='mb-2'>
        <span className='font-medium'>Tags:</span>
        <span className='flex flex-wrap gap-2'>
          {values.tags.map((tag: string, idx: number) => (
            <span
              key={idx}
              className='inline-block bg-gray-light text-gray-darker px-3 py-1 rounded-full text-xs font-medium select-none cursor-default'
            >
              {tag}
            </span>
          ))}
        </span>
      </div>
    </div>
    <div>
      <span className='font-medium'>Images:</span>
      <div className='grid grid-cols-3 gap-3'>
        {values.images.map(
          (img: { file: File; title: string }, idx: number) => (
            <div key={idx} className=' p-2 flex flex-col items-center'>
              {img.file && (
                <img
                  src={URL.createObjectURL(img.file)}
                  alt={img.title}
                  className='w-full h-36 object-cover rounded'
                />
              )}
              <div className='font-medium text-xs mb-1 text-left'>
                {img.title}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
);

export default ReviewStep;
