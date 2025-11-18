import { ArrowRight } from 'lucide-react';
import React from 'react';

export default function TemplateCommunity() {
  const templates = [
    {
      id: 1,
      image: '/images/template-1.png',
      title: 'Art Exhibit',
      featured: true
    },
    {
      id: 2,
      image: '/images/template-2.png',
      title: 'Movie Streaming'
    },
    {
      id: 3,
      image: '/images/template-3.png',
      title: 'Portfolio Grid'
    },
    {
      id: 4,
      image: '/images/template-4.png',
      title: 'Product Showcase'
    },
    {
      id: 5,
      image: '/images/template-5.png',
      title: 'Creative Gallery'
    }
  ];

  return (
    <div className="w-full">
      {/* Templates Section */}
      <div className="bg-linear-to-br from-[#111111] via-[#1E1D1A] to-[#1C3843] py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14 relative">
            <h2 className="mobile-font text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 px-4 relative inline-block">
              Build Templates. Download Free. Grow Together
              <img 
              src="/images/arrow.svg"
              alt="Arrow"
              className="absolute top-12 -right-4 md:top-6 md:-right-4 w-10 h-12 md:w-12 md:h-16"
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
             <button className="group pt-4 text-white mx-auto font-semibold shadow-lg cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden">
              <ArrowRight className="w-4 h-4 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-x-8" />
              Browse Templates
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-8 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-x-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-linear-to-br from-gray-50 to-white py-16 md:py-20 lg:py-24 px-8 md:px-12 relative overflow-hidden">
      
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="relative z-10 animate-fade-in-up">
              <span className="text-purple-600 text-xs md:text-sm font-bold tracking-wider mb-4 block animate-slide-in-left">
                Tribe
              </span>
              <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight relative inline-block animate-fade-in">
                Unlock Your Full Potential Using&nbsp;
                <img 
                src="/images/love.svg"
                alt="Arrow"
                className="absolute -top-10 right-2 md:-top-8 md:right-20 w-12 h-12 md:w-16 md:h-16"
                />
                <span className="relative inline-block">
                 Our Community
                </span> 
              </h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed mb-7 md:mb-9 max-w-xl animate-fade-in-up animation-delay-200">
                Where talents connect, collaborate and grow together. Find your space to learn, connect and grow
              </p>

              <button className="bg-[#F05658] text-white px-7 md:px-9 py-3.5 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:text-[#F05658] mb-6 cursor-pointer">
                Join Community
              </button>

              <div className="flex items-center gap-8 md:gap-10 flex-wrap animate-fade-in-up animation-delay-400">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3 animate-bounce-slow">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-white shadow-lg transform transition-transform hover:scale-110 hover:z-10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                        alt="User 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-white shadow-lg transform transition-transform hover:scale-110 hover:z-10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                        alt="User 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-white shadow-lg transform transition-transform hover:scale-110 hover:z-10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                        alt="User 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-white shadow-lg transform transition-transform hover:scale-110 hover:z-10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                        alt="User 4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-gray-900">---M+</div>
                    <div className="text-xs md:text-sm text-gray-500">Active users</div>
                  </div>
                </div>

                <div className="h-12 md:h-14 w-px bg-gray-300"></div>

                <div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">---+</div>
                  <div className="text-xs md:text-sm text-gray-500">Experts</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in-right animation-delay-200">
              {/* Star Pattern Behind Image - Top Right */}
              <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-32 h-32 md:w-48 md:h-48 z-0">
                {/* Large Star */}
                <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow opacity-60">
                  <polygon points="50,5 61,35 92,35 67,54 78,85 50,66 22,85 33,54 8,35 39,35" fill="#E0E7FF" />
                </svg>
                
                {/* Small Stars */}
                <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 animate-twinkle">
                  <polygon points="50,10 55,30 75,30 60,42 65,62 50,50 35,62 40,42 25,30 45,30" fill="#C7D2FE" />
                </svg>
                
                <svg viewBox="0 0 100 100" className="absolute bottom-4 right-4 w-12 h-12 md:w-16 md:h-16 animate-twinkle animation-delay-500">
                  <polygon points="50,15 53,28 67,28 56,36 59,49 50,42 41,49 44,36 33,28 47,28" fill="#DDD6FE" />
                </svg>
              </div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] group z-10">
                <img 
                  src="/images/community.png"
                  alt="Community collaboration"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Animated Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-linear-to-br from-orange-400 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-40 md:h-40 bg-linear-to-br from-blue-400 to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse-slow animation-delay-500"></div>
              
              {/* Floating particles effect */}
              <div className="absolute top-10 right-10 w-3 h-3 bg-purple-400 rounded-full animate-float"></div>
              <div className="absolute bottom-20 left-10 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-300"></div>
              <div className="absolute top-1/2 right-5 w-2.5 h-2.5 bg-blue-400 rounded-full animate-float animation-delay-700"></div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}