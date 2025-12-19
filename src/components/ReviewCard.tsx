import React from "react";
import { Review } from "../types";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className='bg-white border border-gray-100 rounded-xl p-6 mb-4 shadow-sm'>
      <div className='flex items-center gap-4 mb-4'>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold relative ${review.avatarColor}`}
        >
          {review.initials}
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center'>
            <span className='text-[6px]'>✓</span>
          </div>
        </div>
        <div>
          <h4 className='font-bold text-gray-800'>{review.author}</h4>
          <div className='flex items-center gap-2'>
            <span className='text-orange-400 text-sm'>★ {review.rating}</span>
            <span className='text-gray-400 text-xs'>{review.date}</span>
          </div>
        </div>
      </div>
      <p className='text-gray-600 leading-relaxed'>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
