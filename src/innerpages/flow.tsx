import React from "react";

const ElevateWorkflow = () => {
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

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto 2xl:px-[200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                alt="Question mark with stones"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-transparent"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F05658]/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Elevate Your Workflow with <span className="text-[#F05658]">Allnovas.</span>
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Here's how Allnovas can help you do what you do
            </p>

            {/* Benefits List */}
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#F05658] text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
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

            {/* CTA Button */}
            <button className="mt-10 bg-[#F05658] hover:bg-[#c16456] text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F05658] shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevateWorkflow