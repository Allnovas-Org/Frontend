import React from 'react';

export default function TemplateCommunity() {
  const templates = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      title: 'Art Exhibit',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
      title: 'Movie Streaming'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      title: 'Portfolio Grid'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      title: 'Product Showcase'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop',
      title: 'Creative Gallery'
    }
  ];

  const CurvedArrow = () => (
    <svg 
      width="60" 
      height="80" 
      viewBox="0 0 60 80" 
      fill="none" 
      className="absolute top-8 right-12 hidden lg:block"
    >
      <path 
        d="M10 10 Q 40 30, 50 60" 
        stroke="#FF6B6B" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M50 60 L 45 52 M50 60 L 58 58" 
        stroke="#FF6B6B" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />
    </svg>
  );

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
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Build Templates. Download Free. Grow Together
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              Upload your designs or download free resources.
            </p>
            <CurvedArrow />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Featured Large Template */}
            <div className="md:col-span-1 lg:col-span-1 md:row-span-2">
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl overflow-hidden h-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <img 
                  src={templates[0].image}
                  alt={templates[0].title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Grid Templates */}
            {templates.slice(1).map((template) => (
              <div key={template.id} className="group">
                <div className="bg-gray-700 rounded-2xl overflow-hidden h-48 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <img 
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="text-white text-sm font-medium hover:text-teal-300 transition-colors inline-flex items-center gap-2">
              <span>Browse Template</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-white py-20 px-5 relative overflow-hidden">
        {/* Background Decorative Text */}
        <div className="absolute top-32 right-0 text-[200px] font-bold text-gray-50 select-none pointer-events-none">
          CR
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <span className="text-red-500 text-sm font-semibold uppercase tracking-wide mb-3 block">
                Tribe
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Unlock Your Full Potential Using Our Community
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Where talents connect, collaborate and grow together. Find your space to learn, connect and grow
              </p>

              <button className="bg-red-500 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-10">
                Join Community
              </button>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">---14+</div>
                    <div className="text-xs text-gray-500">Active users</div>
                  </div>
                </div>

                <div className="h-12 w-px bg-gray-200"></div>

                <div>
                  <div className="text-xl font-bold text-gray-900">-----</div>
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
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}