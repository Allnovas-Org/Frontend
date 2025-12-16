import React from 'react';
import { ArrowRight } from 'lucide-react';
import GlobalButton from '../../components/button/GlobalButton';  


const HeroSection: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6">
          <span className="text-purple-600 text-sm font-medium">
            Allnova Offshore
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          Build Your Vision with Allnova{' '}
          <span className="text-purple-600">Offshore Services</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
          Get a complete digital team to bring your ideas to life. From concept to
          launch, we're your remote team of experts.
        </p>

          {/* Call-to-Action Buttons */}
        <div className="flex items-center justify-center gap-4">
           <GlobalButton>Start a Project</GlobalButton>
          <GlobalButton
           color="bg-transparent border border-gray-200" 
           textColor="text-black"
           
          >See Our Work</GlobalButton>
        </div>


      </div>
    </section>
  );
};

export default HeroSection;