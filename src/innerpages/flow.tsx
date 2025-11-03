import React, { useState, useEffect, useRef } from "react";
import qst from "../assets/question.png";

const ElevateWorkflow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const benefits = [
    {
      title: 'Verified Freelancers',
      description: 'Every talent is vetted and reviewed for quality assurance',
      icon: '1',
    },
    {
      title: 'Smart Matching',
      description: 'Instantly connect with freelancers tailored to your needs',
      icon: '2',
    },
    {
      title: 'Secure Payments',
      description: 'Only release funds when milestones are met',
      icon: '3',
    },
  ];

  // Intersection Observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto 2xl:px-[200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image with Bounce Animation */}
          <div className="relative">
            <div 
              className={`relative transform transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-20 scale-95'
              }`}
            >
              {/* Main Image Container with Floating Animation */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float">
                <img
                  src={qst}
                  alt="Question mark with stones"
                  className="w-full h-[450px] md:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/10 to-transparent"></div>
              </div>

              {/* Decorative animated circles */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#F05658]/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              
              {/* Floating accent shapes */}
              <div className="absolute top-1/4 -right-4 w-20 h-20 bg-[#F05658]/30 rounded-full blur-2xl animate-bounce-slow"></div>
              <div className="absolute bottom-1/4 -left-4 w-16 h-16 bg-purple-400/30 rounded-full blur-2xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Right Side - Content with Staggered Animations */}
          <div>
            {/* Title - Fade in from right */}
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight transform transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
            >
              Elevate Your Workflow with <span className="text-[#F05658]">Allnovas.</span>
            </h2>

            {/* Subtitle - Fade in from right with delay */}
            <p 
              className={`text-gray-600 text-lg mb-12 transform transition-all duration-1000 delay-200 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}
            >
              Here's how Allnovas can help you do what you do
            </p>

            {/* Benefits List - Staggered drop-in animation */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 group transform transition-all duration-700 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 -translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${(index + 1) * 200}ms`,
                  }}
                >
                  {/* Animated Icon Badge */}
                  <div className="shrink-0 relative">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#F05658] to-[#c84446] text-white flex items-center justify-center font-bold text-base shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {benefit.icon}
                    </div>
                    {/* Pulsing ring effect */}
                    <div className="absolute inset-0 rounded-full bg-[#F05658] opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F05658] transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
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
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .delay-200 {
          transition-delay: 200ms;
        }
      `}</style>
    </section>
  );
};

export default ElevateWorkflow;