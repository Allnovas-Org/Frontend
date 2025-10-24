import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const SpecializedNiches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const niches = [
    {
      title: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
      color: 'from-blue-900 to-blue-700',
    },
    {
      title: 'Web Development',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
      color: 'from-purple-900 to-purple-700',
    },
    {
      title: 'Mobile App Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      color: 'from-indigo-900 to-indigo-700',
    },
    {
      title: 'Graphics Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      color: 'from-pink-900 to-pink-700',
    },
    {
      title: 'Video Editing & Animation',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
      color: 'from-red-900 to-red-700',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % niches.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + niches.length) % niches.length);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto 2xl:px-[200px]">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Crown Icon */}
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-8 h-8 text-[#F05658]"
              fill="currentColor"
            >
              <path d="M12 48h40l-2-20-10 10-8-18-8 18-10-10-2 20z" />
            </svg>
          </div>

          {/* Subtitle */}
          <p className="text-[#8b5cf6] font-semibold text-sm uppercase tracking-wider mb-2">
            Specialized Niches
          </p>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Your vision, <span className="text-[#F05658]">Our niche</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg">
            We connect clients with high-end freelancers across these categories
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {niches.map((niche, index) => (
                <div key={index} className="min-w-[33.333%] px-3">
                  <div className="group relative rounded-3xl overflow-hidden h-72 cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={niche.image}
                        alt={niche.title}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${niche.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        {niche.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F05658]"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F05658]"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {niches.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#F05658] w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializedNiches;
