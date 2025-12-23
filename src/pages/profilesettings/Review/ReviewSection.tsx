import React from "react";
import ReviewCard from "./ReviewCard";
import RatingSummary from "./RatingSummary";
import { Review } from "../../../types";

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Samuel Daniel",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    package: "Premium",
    date: "May 23, 2025",
    comment:
      "The freelancer did a good job and was very professional in delivering the work. He also has good communication skills and was ready to make sure I got what I wanted.",
    response:
      "Thank you for your feedback! It was a pleasure working with you.",
  },
  {
    id: "2",
    author: "Beejay Jones",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    package: "Standard",
    date: "May 20, 2025",
    comment: "Great work, delivered on time and as expected.",
  },
  {
    id: "3",
    author: "Ogo Glory",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    package: "Basic",
    date: "May 18, 2025",
    comment: "Very creative and professional. Highly recommended!",
    response: "Thank you so much for your kind words!",
  },
];

const ReviewSection: React.FC = () => {
  return (
    <div className='max-w-3xl bg-white font-sans'>
      <RatingSummary />
      <div className='space-y-4'>
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
