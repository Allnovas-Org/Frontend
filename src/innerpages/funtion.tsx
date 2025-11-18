import React, { useState } from 'react';

const Function = () => {
  const [hoveredIndex, setHoveredIndex] = useState(1); // Default to middle card (Functionality)

  const features = [
    {
      title: "Accessibility",
      icon: (
        <svg
          className="w-10 h-10 mb-6 opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <circle cx="15.5" cy="8.5" r="1.5" />
          <circle cx="8.5" cy="15.5" r="1.5" />
          <circle cx="15.5" cy="15.5" r="1.5" />
          <path d="M12 8.5v7M8.5 12h7" />
        </svg>
      ),
      // Sharp transition - 45deg from bottom-left when collapsed
      bgColorCollapsed: "from-blue-950 from-40% via-blue-800 via-50% to-blue-600 to-60%",
      // Sharp transition - 180deg from bottom when expanded
      bgColorExpanded: "from-blue-950 from-50% via-blue-800 via-60% to-blue-600 to-70%",
      gradientDirectionCollapsed: "bg-gradient-to-tr", // bottom-left to top-right (45deg)
      gradientDirectionExpanded: "bg-gradient-to-t", // bottom to top (180deg)
      description: "Work from anywhere, build your career. Your style, your terms.",
      buttonColor: "bg-blue-800/50 hover:bg-blue-700/60",
    },
    {
      title: "Functionality",
      icon: (
        <svg
          className="w-12 h-12 mb-6 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="11" />
        </svg>
      ),
      // Sharp transition - 45deg from top-left when collapsed
      bgColorCollapsed: "from-purple-950 from-40% via-purple-800 via-50% to-purple-600 to-60%",
      // Sharp transition - 180deg from bottom when expanded (already expanded by default)
      bgColorExpanded: "from-purple-950 from-50% via-purple-800 via-60% to-purple-600 to-70%",
      gradientDirectionCollapsed: "bg-gradient-to-br", // top-left to bottom-right (45deg)
      gradientDirectionExpanded: "bg-gradient-to-t", // bottom to top (180deg)
      description: "Connect, create and earn with tools that make freelancing seamless.",
      buttonColor: "bg-purple-800/50 hover:bg-purple-700/60",
    },
    {
      title: "Security",
      icon: (
        <svg
          className="w-10 h-10 mb-6 opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      // Sharp transition - 45deg from top-left when collapsed
      bgColorCollapsed: "from-green-950 from-40% via-green-800 via-50% to-green-600 to-60%",
      // Sharp transition - 180deg from bottom when expanded
      bgColorExpanded: "from-green-950 from-50% via-green-800 via-60% to-green-600 to-70%",
      gradientDirectionCollapsed: "bg-gradient-to-br", // top-left to bottom-right (45deg)
      gradientDirectionExpanded: "bg-gradient-to-t", // bottom to top (180deg)
      description: "Transparent systems and reduced service fees that protect your hustle.",
      buttonColor: "bg-green-800/50 hover:bg-green-700/60",
    },
  ];

  return (
    <section className="py-20 max-w-[80%] mx-auto from-white">
      <div className="max-w-7xl mx-auto 2xl:px-[200px]">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-purple-600 font-semibold text-sm tracking-wider mb-4">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
            Building A Trusted Ecosystem Where
            <br />
            Talents Thrive And Opportunities Grow
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Secured payments, verified talents and transparent projects
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row gap-4 lg:gap-5" onMouseLeave={() => setHoveredIndex(1)}>
          {features.map((feature, index) => {
            const isExpanded = hoveredIndex === index;
            
            // Corner styles - all cards have same style
            const cornerClass = 'rounded-tl-none rounded-bl-3xl rounded-br-none rounded-tr-3xl';
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`group relative overflow-hidden transition-all duration-700 cursor-pointer
                  ${cornerClass}
                  ${isExpanded 
                    ? 'md:flex-2 shadow-2xl' 
                    : 'md:flex-[0.6] shadow-lg'
                  }
                  flex-1
                `}
              >
                {/* Background Gradient - Sharp transition line that shifts on hover */}
                <div className={`absolute inset-0 transition-all duration-700 ${
                  isExpanded 
                    ? `${feature.gradientDirectionExpanded} ${feature.bgColorExpanded}`
                    : `${feature.gradientDirectionCollapsed} ${feature.bgColorCollapsed}`
                }`}></div>
                
                {/* Decorative Circles for subtle glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className={`relative z-10 flex flex-col transition-all duration-700 h-[400px] ${
                  isExpanded 
                    ? 'p-8 text-center justify-start pt-16' 
                    : 'md:p-6 md:text-center p-8 text-center justify-between'
                }`}>
                  {/* Icon - Always at top */}
                  <div className="text-white/90 transition-all duration-700 mx-auto">
                    {feature.icon}
                  </div>

                  {/* Title and Content - Position changes based on expanded state */}
                  <div className={`transition-all duration-700 text-center ${
                    isExpanded ? 'mt-4' : ''
                  }`}>
                    <h3 className={`font-bold text-white transition-all duration-700 mali-font ${
                      isExpanded ? 'text-3xl md:text-4xl mb-2' : 'text-2xl md:text-2xl mb-0'
                    }`}>
                      {feature.title}
                    </h3>
                    
                    {/* Description - Show on mobile always, on desktop only when expanded */}
                    <div className={`overflow-hidden transition-all mali-font duration-700 ${
                      isExpanded 
                        ? 'md:max-h-40 md:opacity-100 max-h-40 opacity-100' 
                        : 'md:max-h-0 md:opacity-0 max-h-40 opacity-100'
                    }`}>
                      <p className="text-white/90 text-base mb-0 leading-relaxed mt-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Button - Only visible when expanded, stays at bottom */}
                  {isExpanded && (
                    <div className="mt-auto transition-all duration-700 text-center">
                      <button className={`inline-flex items-center text-white font-semibold hover:translate-x-2 transition-transform duration-300 px-5 py-2.5 rounded-lg ${feature.buttonColor}`}>
                        Get Started
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Button for mobile - always visible */}
                  <div className={`md:hidden mt-auto transition-all duration-700 text-center overflow-hidden ${
                    isExpanded ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
                  }`}>
                    <button className={`inline-flex items-center text-white font-semibold hover:translate-x-2 transition-transform duration-300 px-5 py-2.5 rounded-lg ${feature.buttonColor}`}>
                      Get Started
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-white/0 transition-all duration-700 pointer-events-none ${
                    isExpanded ? 'bg-white/5' : ''
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Function;