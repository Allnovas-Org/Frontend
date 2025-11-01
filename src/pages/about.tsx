import React from 'react';
import Atcore from '../innerpages/about/atcore';
import TeamSection from '../innerpages/about/teamSection';
import ReviewsSection from '../innerpages/about/review';
import AllNovaFooter from '../components/footer';


// Hero Section Component
export const About = () => {
    const companies = [
    { name: 'Swyft', logo: 'swyft' },
    { name: 'Cowrywise', logo: 'cowrywise' },
    { name: 'Oracle', logo: 'ORACLE' },
    { name: 'YouTube', logo: 'YouTube' },
    { name: 'Google', logo: 'Google' },
    { name: 'PayPal', logo: 'PayPal' },
  ]; 
  const duplicatedCompanies = [...companies, ...companies];
  return (
    <>
    <section className="bg-white py-20 px-4 lg:mt-8 sm:mt-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#6A0DAD] font-medium mb-2">About Us</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Built on Collaboration, Driven by Passion
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
          We're more than a platform, we're a partner. Every project, every connection, every success story starts with people who care about doing meaningful work together.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full flex items-center">
            Sign In
            <span className="ml-2">→</span>
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full">
            Let's Build Together
          </button>
        </div>
      </div>
    </section>


    <section className="bg-white py-12 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
              style={{ minWidth: '150px' }}
            >
              <span className="text-3xl font-bold text-gray-300">
                {company.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
      <style >{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>



    
    <Atcore/>
    <TeamSection/>
    <ReviewsSection/>
    <AllNovaFooter/>
</>

  );
};