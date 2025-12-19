import React from 'react';

const ServicesHero: React.FC = () => {
  return (
    <div className="w-full bg-gray-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Purple Hero Banner */}
        <div className="bg-linear-to-r from-purple-900 to-purple-800 rounded-2xl py-20 md:py-20 px-12 mb-12 text-center">
          <p className="text-gray-200 text-4xl md:text-5xl font-bold">
            Services
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12">
          {/* Section Label */}
          <p className="text-purple-600 text-sm font-semibold mb-4 text-center">
            Our Services
          </p>

          {/* Main Heading */}
          <h2 className="text-gray-900 text-2xl md:text-3xl font-bold mb-6 text-center">
            About AllNovas Offshore Services
          </h2>

          {/* Paragraph 1 */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            <span className="font-semibold text-gray-900">AllNovas Offshore Services provides full-cycle digital solutions, powered by our in-house team of experts.</span> 
            We help companies build, scale, and maintain their products by offering access to a dedicated team without the overhead of traditional hiring.
          </p>

          {/* Paragraph 2 */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Our approach is simple — <span className="font-semibold text-gray-900">we listen, we design, we build, and we deliver excellence.</span>
            Whether you need a mobile app, a custom platform, a brand revamp, or Web3 integration, Allnova becomes your remote digital team.
          </p>

          {/* Paragraph 3 */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            With over 150 completed projects, a 98% on-time delivery rate, and $50M+ in client value generated, we've earned the trust of companies across multiple sectors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
