import React, { useState, useEffect, useRef } from 'react';

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
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      title: 'Tutorials by Experts:',
      description: 'Master new techniques with step-by-step guides created by industry leaders.',
      animation: 'spin'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Interactive Webinars:',
      description: 'Learn directly from the pros in live sessions, complete with Q&A.',
      animation: 'pulse'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'eBooks and Templates:',
      description: 'Access downloadable guides and templates to speed up your projects.',
      animation: 'bounce'
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Tips and Trends:',
      description: 'Stay ahead with insights into cutting-edge design trends.',
      animation: 'wiggle'
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-5 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Video Section */}
      <div className="max-w-6xl mx-auto mb-20 relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            How AllNova Works
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Your Path to Success: From Choosing the Perfect Freelancer to Seamless<br className="hidden md:block" />
            Deliveries at Your Virtual Doorstep
          </p>
        </div>
        
        <div 
          ref={videoRef}
          className="w-full max-w-4xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&mute=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Resources Section - ENHANCED WITH ANIMATIONS */}
      <div ref={resourcesRef} className="max-w-6xl mx-auto relative z-10">
        {/* Title with fade-in animation */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isResourcesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Grow Your Skills With Free Resources From <span className="text-[#F05658]">Allnovas</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Positioning tech experts to grow with carefully curated tutorials, templates and ebooks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
          {/* Image with Parallax & Zoom Effect */}
          <div 
            className={`relative transform transition-all duration-1000 ${
              isResourcesVisible 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-20 scale-95'
            }`}
          >
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                alt="Collaborative workspace with people learning"
                className="w-full h-80 md:h-[450px] lg:h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-red-600/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Floating badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-5 py-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <p className="text-sm font-bold text-[#F05658]">100% Trusted</p>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F05658]/20 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse-slow animation-delay-1000"></div>
          </div>

          {/* Resources List with Staggered Animations */}
          <div>
            <div className="flex flex-col gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-5 group transform transition-all duration-700 ${
                    isResourcesVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-20'
                  }`}
                  style={{ 
                    transitionDelay: `${(index + 2) * 150}ms`,
                  }}
                >
                  {/* Animated Icon Container */}
                  <div className={`relative shrink-0 w-14 h-14 bg-linear-to-br from-[#F05658] to-[#c84446] rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                    resource.animation === 'spin' ? 'group-hover:animate-spin-slow' :
                    resource.animation === 'pulse' ? 'animate-pulse-icon' :
                    resource.animation === 'bounce' ? 'group-hover:animate-bounce-gentle' :
                    'group-hover:animate-wiggle'
                  }`}>
                    {resource.icon}
                    
                    {/* Pulsing ring effect */}
                    <div className="absolute inset-0 rounded-2xl bg-[#F05658] opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 transform group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F05658] transition-colors duration-300">
                      {resource.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons with Staggered Animation */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 mt-10 transform transition-all duration-1000 ${
                isResourcesVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <button className="group relative px-6 py-3 bg-[#F05658] text-white rounded-xl text-sm md:text-base font-semibold overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Free Resources
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-[#c84446] to-[#F05658] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <button className="px-6 py-3 bg-white text-[#F05658] border-2 border-[#F05658] rounded-xl text-sm md:text-base font-semibold hover:bg-[#F05658] hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg">
                Register for free Resources
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg) scale(1.1);
          }
          to {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes pulse-icon {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0) scale(1.1) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) scale(1.1) rotate(12deg);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(12deg) scale(1.1);
          }
          25% {
            transform: rotate(18deg) scale(1.1);
          }
          75% {
            transform: rotate(6deg) scale(1.1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
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

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-pulse-icon {
          animation: pulse-icon 2s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 1s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}