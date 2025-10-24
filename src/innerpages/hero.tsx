import { useState } from 'react';
import { Search } from 'lucide-react';
import React from 'react';
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularSearches = [
    'Graphic Design',
    'Web Development',
    'Programming',
    'UI/UX Design',
    'Presentation Design',
    'Video Editing'
  ];

  return (
    <div className="bg-linear-to-br from-purple-50 via-white to-red-50 pt-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-24 xl:px-40 py-20">
    {/* Floating Testimonial Cards */}
    <div className="relative">
      {/* Left Testimonial */}
      <div className="absolute -left-10 xl:-left-42 top-25 bg-white rounded-2xl shadow-lg p-4 max-w-xs transform rotate-4 hover:rotate-3 transition-transform hidden lg:block">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex-shrink-0"></div>
          <div>
            <p className="text-sm text-gray-700 italic">
              "We found an amazing talent for our project in no time"
            </p>
          </div>


      
        </div>
      </div>

      {/* Right Testimonial */}
      <div className="absolute -right-90 xl:-right-55 top-20 bg-linear-to-br from-orange-100 to-red-100 rounded-2xl shadow-lg p-4 max-w-xs transform -rotate-8 hover:-rotate-7 transition-transform hidden lg:block">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-400 rounded-full flex-shrink-0"></div>
          <div>
            <p className="text-sm text-gray-800 font-medium">
              Freelancing is the way to becoming self employed
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-block mb-8">
          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            Designed for modern collaboration
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="text-gray-900">Co-Creating Your Vision,</span>
          <br />
          <span className="text-red-500 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            One Step at a Time
          </span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
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
                  className="w-full px-9 py-3 pr-14 rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none text-lg transition-all shadow-lg group-hover:shadow-xl"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all transform hover:scale-110">
                  <Search size={24} />
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-gray-600 font-medium">Popular Search:</span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all hover:border-red-500 hover:text-red-500 hover:shadow-md"
                >
                  {search}
                </button>
              ))}


      
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 left-20 w-20 h-20 bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-50 animate-pulse hidden lg:block"></div>
      </div>
      
    </div>
  );
};

 export default HeroSection;