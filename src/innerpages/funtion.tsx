import React from 'react';

const Function = () => {
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
    bgColor: "from-blue-900 to-blue-700",
    description: "Easy access to verified talents and opportunities",
    cornerStyle: "rounded-tr-[3rem]",
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
    bgColor: "from-purple-900 to-purple-600",
    description:
      "Connect, create and earn with tools that make freelancing seamless",
    featured: true,
    cornerStyle: "rounded-[3rem]",
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
    bgColor: "from-green-900 to-green-700",
    description: "Secure payments and protected transactions",
    cornerStyle: "rounded-tl-[3rem]",
  },
];

  return (
    <section className="py-20 px-4  from-white ">
      <div className="max-w-7xl mx-auto 2xl:px-[200px]">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Our Mission
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Building A Trusted Ecosystem Where
            <br />
            <span className="text-[#F05658]">Talents Thrive And Opportunities Grow</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Secured payments, verified talents and transparent projects
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                feature.featured ? 'md:col-span-1 md:row-span-1' : ''
              } animate-slide-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-100`}></div>
              
              {/* Decorative Circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

              {/* Content */}
              <div className={`relative z-10 p-8 flex flex-col ${
                feature.featured ? 'h-full min-h-[400px] justify-between' : 'h-[400px] justify-between'
              }`}>
                {/* Icon */}
                <div className="text-white/80 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform transition-transform">
                  {feature.icon}
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  {feature.featured && (
                    <p className="text-white/90 text-base mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                  )}

                  {feature.featured && (
                    <button className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Get Started
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Function;
