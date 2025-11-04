import React from 'react';

export default function TemplateCommunity() {
  const templates = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1000&fit=crop',
      title: 'Art Exhibit',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&h=400&fit=crop',
      title: 'Movie Streaming'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      title: 'Portfolio Grid'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      title: 'Product Showcase'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      title: 'Creative Gallery'
    }
  ];

  const HeartArrow = () => (
    <svg 
      width="80" 
      height="60" 
      viewBox="0 0 80 60" 
      fill="none" 
      className="absolute -top-2 right-24 hidden lg:block"
    >
      <path 
        d="M5 25 Q 20 10, 35 25 Q 50 10, 65 25" 
        stroke="#FF6B6B" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="22" r="3" fill="#FF6B6B" />
      <path 
        d="M65 25 L 60 20 M65 25 L 60 30" 
        stroke="#FF6B6B" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="w-full">
      {/* Templates Section */}
      <div className="bg-linear-to-br from-[#1a1a1a] via-[#2d3436] to-[#1e3a3a] py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14 relative">
            <h2 className="mobile-font text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 px-4 relative inline-block">
              Build Templates. Download Free. Grow Together
          <img 
            src="/images/arrow.svg"
            alt="Templates Icon"
            className="absolute -top-8 -right-4 md:-top-12 md:-right-8 w-10 h-12 md:w-12 md:h-16"
          />
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              Upload your designs or download free resources.
            </p>
          </div>

          {/* Desktop and Mobile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8 max-w-6xl mx-auto">
            {/* Featured Large Template - Left Side */}
            <div className="h-64 md:h-[450px]">
              <div className="bg-linear-to-br from-[#b8dfe0] via-[#9dd1d3] to-[#7fb5b5] rounded-2xl md:rounded-3xl h-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 cursor-pointer pt-8 pl-8 md:pt-10 md:pl-10">
                <img 
                  src={templates[0].image}
                  alt={templates[0].title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Grid Templates - Right Side (2x2) */}
            <div className="grid grid-cols-2 gap-4 md:gap-5 h-64 md:h-[450px]">
              {/* Template 2 - Purple/Dark Blue Background */}
              <div className="group h-full">
                <div className="bg-linear-to-br from-[#5a4e7f] via-[#4a4068] to-[#3d355a] rounded-xl md:rounded-2xl h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer pt-6 pl-6 md:pt-8 md:pl-8">
                  <img 
                    src={templates[1].image}
                    alt={templates[1].title}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Template 3 - Teal/Cyan Background */}
              <div className="group h-full">
                <div className="bg-linear-to-br from-[#5a7a7d] via-[#4a6568] to-[#3d5558] rounded-xl md:rounded-2xl h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer pt-6 pl-6 md:pt-8 md:pl-8">
                  <img 
                    src={templates[2].image}
                    alt={templates[2].title}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Template 4 - Gray Background */}
              <div className="group h-full">
                <div className="bg-linear-to-br from-[#6b7278] via-[#5a6065] to-[#4a5055] rounded-xl md:rounded-2xl h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer pt-6 pl-6 md:pt-8 md:pl-8">
                  <img 
                    src={templates[3].image}
                    alt={templates[3].title}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Template 5 - Dark Gray Background */}
              <div className="group h-full">
                <div className="bg-linear-to-br from-[#5a5f64] via-[#4d5256] to-[#424649] rounded-xl md:rounded-2xl h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer pt-6 pl-6 md:pt-8 md:pl-8">
                  <img 
                    src={templates[4].image}
                    alt={templates[4].title}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="text-white text-sm md:text-base font-medium hover:text-teal-300 transition-colors inline-flex items-center gap-2 group">
              <span>Browse Template</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-white py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-20 md:top-32 right-0 text-[120px] md:text-[200px] font-bold text-gray-50 select-none pointer-events-none opacity-50">
          CR
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <span className="text-red-500 text-xs md:text-sm font-semibold uppercase tracking-wide mb-3 block">
                Tribe
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Unlock Your Full Potential Using Our Community
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                Where talents connect, collaborate and grow together. Find your space to learn, connect and grow
              </p>

              <button className="bg-red-500 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8 md:mb-10 text-sm md:text-base">
                Join Community
              </button>

              <div className="flex items-center gap-6 md:gap-8 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gray-900">14K+</div>
                    <div className="text-xs text-gray-500">Active users</div>
                  </div>
                </div>

                <div className="h-10 md:h-12 w-px bg-gray-200"></div>

                <div>
                  <div className="text-lg md:text-xl font-bold text-gray-900">500+</div>
                  <div className="text-xs text-gray-500">Experts</div>
                </div>
              </div>

              <HeartArrow />
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Community collaboration"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-orange-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}