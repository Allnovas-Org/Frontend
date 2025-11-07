import React, { useState } from "react";

// Review Card Component
interface Review {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

type ReviewCardProps = {
  review: Review;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 h-full flex flex-col justify-between min-h-[320px] transition-transform duration-300 hover:shadow-lg">
      {/* Quote */}
      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed text-sm">
          "{review.quote}"
        </p>
      </div>

      {/* Client Info */}
      <div className="flex items-center space-x-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{review.name}</h4>
          <p className="text-sm text-gray-500">{review.role}</p>
        </div>
      </div>
    </div>
  );
};

// Main Reviews Section Component
const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const reviews = [
    {
      id: 1,
      quote:
        "I found a talented designer in just a few hours, and the whole process was smooth and transparent. The quality of freelancers here is outstanding! I'll definitely keep using Allnova for future projects.",
      name: "King David",
      role: "Brand Consultant",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      quote:
        "Allnova connects me with serious clients who know what they want. Payments are smooth, projects are well-matched, and the support team is amazing.",
      name: "Vivian Kane",
      role: "Web Developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      quote:
        "Allnova made it easy to find a reliable developer who understood our goals right away. Fast, friendly, and professional service.",
      name: "Jemmy June",
      role: "Tech Startup Founder",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      quote:
        "I love how Allnova encourages collaboration and communication. It's helped me grow my freelance business and build long-term client relationships.",
      name: "Abigail Ackins",
      role: "Digital Marketer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      quote:
        "The platform is intuitive and the freelancers are top-notch. I've completed multiple projects here and the experience has been consistently excellent.",
      name: "Michael Chen",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      quote:
        "Finding quality clients has never been easier. Allnova takes care of the hard parts so I can focus on delivering great work.",
      name: "Sarah Williams",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
  ];

  const itemsPerPage = 4;
  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            Our Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact Told by Our Clients
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Every project is a partnership. Hear from the amazing clients who
            trusted us to bring their vision to life.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className="transition-all duration-300 ease-in-out"
                style={{
                  opacity: isAnimating ? 0.5 : 1,
                  transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
                }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                currentIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
              aria-label="Previous reviews"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentIndex(index);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gray-600"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                currentIndex === maxIndex
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
              }`}
              aria-label="Next reviews"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;