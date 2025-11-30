import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

export default function AllNovaSections() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isResourcesVisible, setIsResourcesVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef(null);

  useEffect(() => {
    const checkVideoInView = () => {
      if (hasPlayed || !videoRef.current) return;

      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
        const iframe = videoRef.current.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
          setHasPlayed(true);
        }
      }
    };

    window.addEventListener('scroll', checkVideoInView);
    checkVideoInView();

    return () => window.removeEventListener('scroll', checkVideoInView);
  }, [hasPlayed]);

  // Intersection Observer for Resources Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsResourcesVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (resourcesRef.current) {
      observer.observe(resourcesRef.current);
    }

    return () => {
      if (resourcesRef.current) {
        observer.unobserve(resourcesRef.current);
      }
    };
  }, []);

  const resources = [
    {
      iconSrc: '/images/teacher.svg', 
      title: 'Tutorials by Experts:',
      description: 'Master new techniques with step-by-step guides created by industry leaders.',
    },
    {
      iconSrc: '/images/people.svg', 
      title: 'Interactive Webinars:',
      description: 'Learn directly from the pros in live sessions, complete with Q&A.',
    },
    {
      iconSrc: '/images/book.svg', 
      title: 'eBooks and Templates:',
      description: 'Access downloadable guides and templates to speed up your projects.',
    },
    {
      iconSrc: '/images/lamp-on.svg',
      title: 'Tips and Trends:',
      description: 'Stay ahead with insights into cutting-edge design trends.',
    }
  ];

  return (
    <div className="bg-white py-16 px-5 relative overflow-hidden">
      {/* Animated Background Blobs */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div> */}

      {/* Resources Section */}
      <div ref={resourcesRef} className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isResourcesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4">
            Grow Your Skills With Free Resources From Allnovas
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Positioning tech experts to grow with carefully curated tutorials, templates and ebooks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
          {/* Image - Rectangle/Landscape */}
          <div 
            className={`transform transition-all duration-1000 ${
              isResourcesVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/grow.png"
                alt="Collaborative workspace with people learning"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
            </div>
          </div>

          {/* Resources List */}
          <div>
            <div className="flex flex-col gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-5 transform transition-all duration-700 ${
                    isResourcesVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-20'
                  }`}
                  style={{ 
                    transitionDelay: `${(index + 2) * 150}ms`,
                  }}
                >
                  {/* Icon Image */}
                  <div className="shrink-0">
                    <img
                      src={resource.iconSrc}
                      alt={resource.title}
                      className="w-5 h-5 object-contain mt-1"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 mt-10 transform transition-all duration-1000 ${
                isResourcesVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <button className="group px-6 py-3 bg-[#F05658] text-white rounded-xl text-sm font-semibold shadow-lg cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden">
                <ArrowRight className="w-4 h-4 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-x-8" />
                Explore Free Resources
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-8 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
              </button>
              
              <button className="group px-6 py-3 bg-white text-[#F05658] border-2 border-[#F05658] rounded-xl text-sm font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2">
                Register for free Resources
                <Plus className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}