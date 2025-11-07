import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import React from 'react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Testimonial data with images
  const testimonials = {
    left: [
      {
        text: "Freelancing let you to earn on your terms, anytime, anywhere",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
      },
      {
        text: "We found an amazing talent for our project in no time",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
      },
      {
        text: "The quality of work exceeded our expectations",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
      }
    ],
    right: [
      {
        text: "Freelancing unlocks the freedom to turn your skills into income.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
      },
      {
        text: "Building my career on my own terms has been incredible",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
      },
      {
        text: "Best decision I made was to start freelancing",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop"
      }
    ]
  };

  const popularSearches = [
    'Graphic Design',
    'Web Development',
    'Programming',
    'UI/UX Design',
    'Presentation Design',
    'Video Editing'
  ];

  // Rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.left.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentLeftTestimonial = testimonials.left[currentTestimonialIndex];
  const currentRightTestimonial = testimonials.right[currentTestimonialIndex];

  return (
      <div className="bg-linear-to-br from-purple-50 via-white to-red-50 pt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 py-16 lg:py-20">
        {/* Floating Testimonial Cards */}
        <div className="relative">
          {/* Left Testimonial - Image on TOP LEFT outside box */}
          <div className="absolute -left-4 xl:-left-20 top-32 lg:top-20 hidden lg:block">
            <div className="relative">
              {/* Profile Image - positioned outside at top left - FIXED */}
              <div className="absolute -top-6 -left-6 w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                <img 
                  src={currentLeftTestimonial.image} 
                  alt="Testimonial" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text Box - with subtle static tilt */}
              <div 
                key={currentTestimonialIndex}
                className="bg-linear-to-br from-pink-50 to-rose-100 shadow-lg p-5 w-64 transform rotate-4 hover:rotate-3 transition-all duration-300"
              >
                <p className="text-xs text-gray-700 leading-relaxed pt-2">
                  {currentLeftTestimonial.text}
                </p>
              </div>
            </div>
          </div>

          {/* Right Testimonial - Image on TOP RIGHT outside box */}
          <div className="absolute -right-4 xl:-right-20 top-10 lg:top-8 hidden lg:block">
            <div className="relative">
              {/* Profile Image - positioned outside at top right - FIXED */}
              <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-lg z-10">
                <img 
                  src={currentRightTestimonial.image} 
                  alt="Testimonial" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Text Box - with subtle static tilt */}
              <div 
                key={`right-${currentTestimonialIndex}`}
                className="bg-linear-to-br from-blue-50 to-cyan-50 shadow-lg p-5 w-64 transform -rotate-4 hover:-rotate-3 transition-all duration-300"
              >
                <p className="text-xs text-gray-800 leading-relaxed pt-2">
                  {currentRightTestimonial.text}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto relative z-10">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-medium">
                Designed for modern collaboration
              </span>
            </div>

            {/* SVG Decoration - Mobile Only */}
            <div className="lg:hidden flex justify-end max-w-sm mx-auto -mb-6">
              {/* Replace this SVG with your own */}
              <img
                src="/images/text-dec.svg" 
                alt="Decoration" 
                className="w-12 h-12"
              />
            </div>

            {/* Main Heading */}
            <h1 className="mobile-font text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Co-Creating Your Vision,</span>
              <br />
              <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                One Step at a Time
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              From concept to final deliverables, we build with transparency at every stage, keeping you inspired throughout the journey
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-14 rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none text-base lg:text-lg transition-all shadow-md group-hover:shadow-lg"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full transition-all transform hover:scale-105">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
              <span className="text-gray-600 font-medium text-sm lg:text-base">Popular Search:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all hover:border-red-400 hover:text-red-500 hover:shadow-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Blur Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30 animate-pulse hidden lg:block"></div>
      </div>
      </div>
  );
};

export default HeroSection;