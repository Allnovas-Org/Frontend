import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const SpecializedNiches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const niches = [
    {
      title: 'UI/UX Designer',
      image: '/images/niche-1.png',
      bgColor: 'bg-blue-900',
    },
    {
      title: 'Web Development',
      image: '/images/niche-2.png',
      bgColor: 'bg-purple-900',
    },
    {
      title: 'Mobile App Development',
      image: '/images/niche-3.png',
      bgColor: 'bg-indigo-600',
    },
    {
      title: 'Graphics Design',
      image: '/images/niche-4.png',
      bgColor: 'bg-pink-500',
    },
    {
      title: 'Video Editing & Animation',
      image: '/images/niche-5.png',
      bgColor: 'bg-red-600',
    },
    {
      title: 'Illustration & Digital Art',
      image: '/images/niche-6.png',
      bgColor: 'bg-orange-600',
    },
    {
      title: 'Programming & Tech',
      image: '/images/niche-7.png',
      bgColor: 'bg-teal-700',
    },
    {
      title: 'Social Media Design & Mgt',
      image: '/images/niche-8.png',
      bgColor: 'bg-cyan-600',
    },
    {
      title: 'Presentation Design',
      image: '/images/niche-9.png',
      bgColor: 'bg-violet-600',
    },
  ];

  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(5);
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
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex;
      }
      return prev - 1;
    });
  };

  // Drag handlers
  const getPositionX = (event: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in event ? event.touches[0].clientX : event.clientX;
  };

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartPos(getPositionX(event));
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grabbing';
    }
  };

  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 100; // Minimum drag distance to trigger slide change

    if (movedBy < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isDragging) return; // Don't auto-play while dragging
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isDragging]);

  return (
    <section className="py-20 px-5 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-6xl mx-auto 2xl:px-[200px] relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <p className="text-purple-600 font-semibold text-sm tracking-wider mb-4">
            Specialized Niches
          </p>

          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your vision, Our niche
            </h2>
            
            <div className="absolute -top-8 -right-5">
              <img src="/images/misc-06.svg" alt="Crown Decoration" className="w-10 h-10 md:w-12 md:h-12 animate-bounce-slow" />
            </div>
          </div>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We connect clients with high-end freelancers across these categories
          </p>
        </div>

        {/* Carousel with Drag Support */}
        <div className="relative px-4 md:px-12">
          <div 
            className="overflow-hidden"
            ref={sliderRef}
          >
            <div
              className="flex transition-transform duration-700 ease-out gap-4 md:gap-5 select-none"
              style={{ 
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${isDragging ? currentTranslate : 0}px))`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.7s ease-out'
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {niches.map((niche, index) => (
                <div 
                  key={index} 
                  className={`shrink-0 ${
                    itemsPerView === 2 ? 'w-[calc(50%-8px)]' : 'w-[calc(20%-16px)]'
                  }`}
                  onMouseEnter={() => !isDragging && setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card with border */}
                  <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transform transition-all duration-500 h-full flex flex-col border border-gray-200 ${
                    hoveredCard === index ? 'scale-[1.03] -translate-y-2' : ''
                  }`}>
                    {/* Image Container - Rounded top only */}
                    <div className="relative h-48 md:h-56 overflow-hidden shrink-0">
                      <img
                        src={niche.image}
                        alt={niche.title}
                        className={`w-full h-full object-cover transition-transform duration-700 rounded-t-2xl p-1 ${
                          hoveredCard === index ? 'scale-110' : ''
                        }`}
                        draggable="false"
                      />
                    </div>

                    {/* Thin Divider Line */}
                    <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>

                    {/* Title Section */}
                    <div className="p-4 text-center bg-white grow flex items-center justify-center">
                      <h3 className={`text-xs md:text-sm font-semibold text-gray-800 hover:text-[#F05658] transition-all duration-300 leading-snug ${
                        hoveredCard === index ? 'text-[#F05658] scale-105' : ''
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