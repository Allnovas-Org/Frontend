import React, { useState, useEffect, useRef } from 'react';

export default function AllNovaSections() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkVideoInView = () => {
      if (hasPlayed || !videoRef.current) return;

      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Check if video is in viewport (at least 50% visible)
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

  const resources = [
    {
      icon: '🎓',
      title: 'Tutorials by Experts:',
      description: 'Master new techniques with step-by-step guides created by industry leaders.'
    },
    {
      icon: '💡',
      title: 'Interactive Webinars:',
      description: 'Learn directly from the source in live sessions, complete with Q&A.'
    },
    {
      icon: '📚',
      title: 'eBooks and Templates:',
      description: 'Access downloadable guides and templates to speed up your projects.'
    },
    {
      icon: '💡',
      title: 'Tips and Trends:',
      description: 'Stay ahead with insights into cutting-edge design trends.'
    }
  ];

  return (
    <div className="bg-gray-100 py-16 px-5">
      {/* Video Section */}
      <div className="max-w-6xl mx-auto mb-20">
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

      {/* Resources Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Grow Your Skills With Free Resources From AllNovas
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Positioning tech experts to grow with carefully curated tutorials, templates and ebooks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mt-12">
          {/* Image */}
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=800&h=800&fit=crop"
              alt="Artist workspace with colorful artwork"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Resources Info */}
          <div>
            <div className="flex flex-col gap-7">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-11 h-11 min-w-11 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1.5">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-9">
              <button className="px-5 py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                Explore Free Resources
              </button>
              <button className="px-5 py-3 bg-white text-red-500 border border-red-500 rounded-md text-sm font-medium hover:bg-red-50 transition-all duration-300">
                Register for Free Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
