import React from "react";
// @ts-ignore: allow importing image assets when no module declaration is present
import img from '../../assets/woman.png'
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col">
      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// Main Mission Section Component
const Atcore = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Quality",
      description:
        "From the first idea to the final handoff, we hold ourselves to the highest level of craftsmanship, ensuring every project delivers lasting impact.",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: "Security",
      description:
        "We safeguard every project and transaction with the highest standards of protection, ensuring your data and collaboration stay safe at every step.",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Functionality",
      description:
        "From concept to delivery, we provide seamless experiences that work flawlessly, helping clients and freelancers stay productive",
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Accessibility",
      description:
        "Our goal is to create experiences that everyone can use, enjoy, and benefit from, regardless of ability or circumstance.",
    },
  ];

  return (
    <section className="relative py-20 px-4  overflow-hidden">
 

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-purple-600 font-semibold mb-3 text-sm uppercase tracking-wide">
            At Our Core
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Mission Sets Us Apart
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Redefining how freelancers and businesses connect, creating
            partnerships built on trust and shared success.
            <br />
            Every project we take on is a step toward a collaborative way of
            working.
          </p>
        </div>

        {/* Features Grid with Center Image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column - Quality & Functionality */}
          <div className="space-y-6">
            <FeatureCard
              icon={features[0].icon}
              title={features[0].title}
              description={features[0].description}
            />
            <FeatureCard
              icon={features[2].icon}
              title={features[2].title}
              description={features[2].description}
            />
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <div className="relative lg:mt-25 sm:mt-0 ">
              <div className="w-64 h-70 md:w-90 md:h-90 rounded-xl overflow-hidden ">
                <img
                  src={img}
                  alt="Professional woman smiling"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-1 -right-1 w-32 h-29 bg-gray-100 rounded-full  -z-10" />
            </div>
          </div>

          {/* Right Column - Security & Accessibility */}
          <div className="space-y-6">
            <FeatureCard
              icon={features[1].icon}
              title={features[1].title}
              description={features[1].description}
            />
            <FeatureCard
              icon={features[3].icon}
              title={features[3].title}
              description={features[3].description}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atcore;