import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

const Review: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    {
      id: '1',
      quote: '"Allnova delivered our mobile app in record time. The quality and attention to detail were exceptional."',
      name: 'King David',
      title: 'Brand Consultant',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: '2',
      quote: '"We scaled from 0 to 100k users with Allnova\'s backend infrastructure. They understood our vision perfectly."',
      name: 'Vivian Kane',
      title: 'Web Developer',
      avatarUrl: 'https://i.pravatar.cc/150?img=47',
    },
    {
      id: '3',
      quote: '"The Allnova team became an extension of our own. Seamless collaboration and incredible results."',
      name: 'Jemmy June',
      title: 'Tech Startup Founder',
      avatarUrl: 'https://i.pravatar.cc/150?img=38',
    },
    {
      id: '4',
      quote: '"I love how Allnova encourages collaboration and communication. It\'s helped me grow my freelance business and build long-term client relationships."',
      name: 'Abigail Ackins',
      title: 'Digital Marketer',
      avatarUrl: 'https://i.pravatar.cc/150?img=32',
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get visible reviews based on current index and screen size
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % reviews.length;
      visible.push({ ...reviews[index], originalIndex: index });
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="w-full bg-gray-50 px-4 py-16 md:py-24 flex justify-center items-center min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-purple-600 text-sm font-medium mb-2 block">
            Our Reviews
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            What Our Clients Say About Us
          </h2>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {visibleReviews.map((review, displayIndex) => (
              <div
                key={`${review.id}-${currentIndex}-${displayIndex}`}
                className={`bg-white rounded-xl p-8 min-h-[320px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-3 hover:bg-gradient-to-br hover:from-red-50 hover:to-gray-100 ${
                  displayIndex === 0 ? 'block' : 
                  displayIndex < 2 ? 'hidden md:block' : 
                  'hidden lg:block'
                }`}
              >
                {/* Quote */}
                <p className="text-gray-700 text-sm leading-relaxed mb-8">
                  {review.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img 
                    src={review.avatarUrl} 
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900 font-semibold text-sm">
                      {review.name}
                    </h4>
                    <p className="text-gray-500 text-xs">{review.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'w-8 bg-purple-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;