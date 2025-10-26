import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../SignupFlow/testimonials";

const RightSide: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const prevTestimonial = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsTransitioning(false);
      }, 500);
    }
  };

  // Auto-play effect - 7 seconds per slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000); // 7 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, isTransitioning]); // Dependencies to ensure proper cleanup

  const current = testimonials[currentIndex];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-5 h-5 fill-white text-white" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-5 h-5">
          <Star className="w-5 h-5 text-white absolute" />
          <div className="overflow-hidden absolute w-1/2">
            <Star className="w-5 h-5 fill-white text-white" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-white" />
      );
    }

    return stars;
  };

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-l-3xl">
      {/* Background Image - Full Coverage */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{ backgroundImage: `url(${current.image})` }}
      />

      {/* White Transparent Overlay - Only for Text Area */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2/5"
        style={{
          backgroundColor: 'rgba(128, 128, 128, 0.45)'
        }}
      />

      {/* Content - Only at Bottom */}
      <div className="relative z-10 flex flex-col justify-end p-12 text-white w-full">
        {/* Testimonial Content */}
        <div className={`space-y-6 transition-all duration-700 ease-in-out ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          {/* Quote */}
          <p className=" text-lg leading-relaxed">
            "{current.quote}"
          </p>

          {/* Author Info and Star Rating Row */}
          <div className="flex items-end justify-between">
            {/* Left Side - Author Info */}
            <div>
              <h3 className="text-xl font-bold">{current.name}</h3>
              <p className="text-base text-white/95 mt-1">{current.title}</p>
              <p className="text-sm text-white/90">{current.company}</p>
            </div>

            {/* Right Side - Star Rating and Navigation */}
            <div className="flex flex-col items-end gap-3">
              {/* Star Rating */}
              <div className="flex gap-1">
                {renderStars(current.rating)}
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full border-2 border-white/60 hover:bg-white/20 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full border-2 border-white/60 hover:bg-white/20 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;