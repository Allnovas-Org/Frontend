import React from "react";

export interface ReviewStarsProps {
  rating?: number;
  max?: number;
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ rating = 0, max = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <span className='flex items-center gap-1'>
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg key={`full-${i}`} width='16' height='16' viewBox='0 0 24 24'>
          <path
            d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
            fill='#FACC15'
          />
        </svg>
      ))}
      {hasHalfStar && (
        <svg key='half' width='16' height='16' viewBox='0 0 24 24'>
          <defs>
            <linearGradient id='halfStar' x1='0' x2='1' y1='0' y2='0'>
              <stop offset='50%' stopColor='#FACC15' />
              <stop offset='50%' stopColor='#E5E7EB' />
            </linearGradient>
          </defs>
          <path
            d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
            fill='url(#halfStar)'
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} width='16' height='16' viewBox='0 0 24 24'>
          <path
            d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
            fill='#E5E7EB'
          />
        </svg>
      ))}
    </span>
  );
};

export default ReviewStars;
