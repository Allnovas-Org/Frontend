import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { Review } from "../../../types";

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className='bg-white border border-gray-100 rounded-2xl p-6 mb-4 shadow-sm'>
      <div className='flex justify-between items-start mb-4'>
        <div className='flex gap-3'>
          <img
            src={review.avatar}
            alt={review.author}
            className='w-12 h-12 rounded-full object-cover'
          />
          <div>
            <h4 className='font-bold text-gray-900'>{review.author}</h4>
            <p className='text-xs text-gray-400'>
              {review.package} • {review.date}
            </p>
          </div>
        </div>
        <div className='flex text-orange-400'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      <p className='text-gray-600 text-sm leading-relaxed mb-4'>
        {review.comment}
      </p>

      {review.response && (
        <div className='bg-gray-50 rounded-xl p-4 flex gap-3 border border-gray-100'>
          <MessageSquare size={18} className='text-gray-400 shrink-0' />
          <div>
            <span className='text-xs font-bold text-gray-800'>
              Freelancer Response
            </span>
            <p className='text-gray-500 text-xs mt-1 italic'>
              "{review.response}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
