import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import { Review, RatingBreakdown } from "../../../types";

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Samuel Daniel",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    package: "Standard",
    rating: 4.9,
    date: "May 23, 2025",
    comment:
      "The freelancer did a good job and was very professional in delivering the work. He also have a good communication skills and was ready to make sure I got what I wanted",
  },
  {
    id: "2",
    author: "Beejay Jones",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    package: "Premium",
    rating: 4.9,
    date: "May 23, 2025",
    comment:
      "The freelancer did a good job and was very professional in delivering the work. He also have a good communication skills and was ready to make sure I got what I wanted",
  },
  {
    id: "3",
    author: "Ogo Glory",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    package: "Basic",
    rating: 4.9,
    date: "May 23, 2025",
    comment:
      "The freelancer did a good job and was very professional in delivering the work. He also have a good communication skills and was ready to make sure I got what I wanted",
  },
];

const ReviewSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"this" | "other">("this");

  const categories: RatingBreakdown[] = [
    { label: "Availability", score: 4.9 },
    { label: "Quality of work", score: 4.9 },
    { label: "Professionalism", score: 4.9 },
    { label: "Creativity", score: 4.9 },
    { label: "Communication", score: 4.8 },
    { label: "Cooperation", score: 4.0 },
  ];

  return (
    <div className='max-w-5xl mx-auto p-8 bg-white font-sans'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Client Ratings</h2>
      <div className='grid md:grid-cols-2 gap-12 mb-10'>
        <div>
          <div className='flex items-baseline gap-2 mb-4'>
            <span className='text-xl font-bold'>4.8</span>
            <span className='text-gray-500 text-sm'>- 331 Reviews</span>
          </div>
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className='flex items-center gap-3 mb-1'>
              <div className='flex text-orange-400 text-lg w-16'>
                {"★".repeat(star)}
                {"★".repeat(5 - star).replace(/★/g, "☆")}
              </div>
              <span className='text-gray-400 text-xs w-8'>
                (
                {star === 5
                  ? 200
                  : star === 4
                  ? 120
                  : star === 3
                  ? 10
                  : star === 2
                  ? 1
                  : 0}
                )
              </span>
            </div>
          ))}
        </div>
        <div>
          <h3 className='font-bold mb-4 text-gray-800'>Ratings Breakdown</h3>
          <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
            {categories.map((cat) => (
              <div
                key={cat.label}
                className='flex justify-between items-center text-sm'
              >
                <span className='text-gray-600'>{cat.label}</span>
                <span className='flex items-center gap-1 font-medium'>
                  <span className='text-orange-400 text-lg'>★</span>{" "}
                  {cat.score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className='border-b border-gray-200 mb-8 flex gap-8'>
        <button
          onClick={() => setActiveTab("this")}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === "this"
              ? "border-b-2 border-red-400 text-red-400"
              : "text-gray-400"
          }`}
        >
          This Gig{" "}
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === "this" ? "bg-red-400 text-white" : "bg-gray-200"
            }`}
          >
            9
          </span>
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === "other"
              ? "border-b-2 border-red-400 text-red-400"
              : "text-gray-400"
          }`}
        >
          Other Gigs{" "}
          <span className='bg-gray-400 text-white px-2 py-0.5 rounded-full text-[10px]'>
            270
          </span>
        </button>
      </div>
      {/* Reviews List */}
      <div className='space-y-4'>
        {MOCK_REVIEWS.map((rev) => (
          <ReviewCard key={rev.id} review={rev} />
        ))}
      </div>
      <button className='mt-6 px-6 py-2 border border-red-400 text-red-400 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium'>
        See More
      </button>
    </div>
  );
};

export default ReviewSection;
