import React, { useState } from 'react';
import AllNovaBlack from "../../../assets/AllNova black 2 (1).png";
const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribing email:', email);
    // Add  newsletter subscription logic here
    setEmail('');
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo - Left Side */}
          <button 
            onClick={handleLogoClick}
            className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
          >
            <img 
              src={AllNovaBlack} 
              alt="Allnova Logo"  
              className="h-8 w-auto"
            />
          </button>

          {/* Newsletter Subscription - Right Side */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full md:w-64 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSubscribe}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNewsletter;