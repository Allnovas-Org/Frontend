import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const SpecializedNiches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const niches = [
    {
      title: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
      bgColor: 'bg-blue-900',
    },
    {
      title: 'Web Development',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
      bgColor: 'bg-purple-900',
    },
    {
      title: 'Mobile App Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      bgColor: 'bg-indigo-600',
    },
    {
      title: 'Graphics Design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      bgColor: 'bg-pink-500',
    },
    {
      title: 'Video Editing & Animation',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Illustration & Digital Art',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
      bgColor: 'bg-orange-600',
    },
    {
      title: 'Programming & Tech',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      bgColor: 'bg-teal-700',
    },
    {
      title: 'Social Media Design & Mgt',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      bgColor: 'bg-cyan-600',
    },
    {
      title: 'Presentation Design',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      bgColor: 'bg-violet-600',
    },
  ];

  // Responsive: 4 on desktop, 2 on mobile
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, niches.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0; // Loop back to start
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex; // Loop to end
      }
      return prev - 1;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  return (
    <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto 2xl:px-[200px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          {/* Subtitle */}
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Specialized Niches
          </p>

          {/* Main Title with Crown Decoration */}
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your vision, <span className="text-[#F05658]">Our niche</span>
            </h2>
            
            {/* Crown/Sparkle Decoration - positioned to the right */}
            <div className="absolute -top-4 -right-16 md:-right-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-12 h-12 md:w-16 md:h-16 text-[#F05658] animate-pulse"
                fill="currentColor"
              >
                {/* Crown/burst design */}
                <circle cx="85" cy="15" r="4" className="animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
                <circle cx="75" cy="5" r="3" className="animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2s' }} />
                <circle cx="90" cy="8" r="3" className="animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }} />
                
                {/* Main burst lines */}
                <line x1="50" y1="50" x2="70" y2="20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="50" x2="80" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <line x1="50" y1="50" x2="80" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="50" x2="70" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We connect clients with high-end freelancers across these categories
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-4 md:px-12">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out gap-5 md:gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
              }}
            >
              {niches.map((niche, index) => (
                <div 
                  key={index} 
                  className={`shrink-0 ${
                    itemsPerView === 2 ? 'w-[calc(50%-10px)]' : 'w-[calc(25%-18px)]'
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transform transition-all duration-500 h-full flex flex-col ${
                    hoveredCard === index ? 'scale-[1.05] -translate-y-3' : ''
                  }`}>
                    {/* Image Container - Fixed Height */}
                    <div className="relative h-56 md:h-72 overflow-hidden shrink-0">
                      <img
                        src={niche.image}
                        alt={niche.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === index ? 'scale-110 brightness-110' : ''
                        }`}
                      />
                      {/* Gradient Overlay - More subtle */}
                      <div className={`absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 ${
                        hoveredCard === index ? 'opacity-60' : 'opacity-40'
                      }`}></div>
                      
                      {/* Colored accent on hover */}
                      <div className={`absolute inset-0 ${niche.bgColor} opacity-0 transition-opacity duration-500 ${
                        hoveredCard === index ? 'opacity-20' : ''
                      }`}></div>
                    </div>

                    {/* Title - Fixed Height */}
                    <div className="p-5 md:p-6 text-center bg-white grow flex items-center justify-center">
                      <h3 className={`text-sm md:text-lg font-bold text-gray-900 transition-all duration-300 leading-snug ${
                        hoveredCard === index ? 'text-[#F05658]' : ''
                      }`}>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 bg-white/95 backdrop-blur-sm hover:bg-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F05658] focus:ring-offset-2 z-10 group"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-[#F05658] transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 bg-white/95 backdrop-blur-sm hover:bg-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F05658] focus:ring-offset-2 z-10 group"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-[#F05658] transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecializedNiches;