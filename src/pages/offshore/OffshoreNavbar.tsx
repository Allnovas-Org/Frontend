import React from "react";
import { Link } from "react-router-dom";
import GlobalButton from "../../components/button/GlobalButton";
import AllNovaBlack from "../../assets/AllNova black 2 (1).png";

const OffshoreNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div>
            <Link to="/" className="flex-shrink-0">
              <img 
                src={AllNovaBlack} 
                alt="Allnova Logo" 
                className="h-8 w-auto md:h-10"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            
            <Link 
              to="/offshore/services" 
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
            >
              Services
            </Link>
            
            <Link 
              to="/offshore/contact" 
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Call-to-Action Button */}
          <div>
            <GlobalButton>Schedule Call</GlobalButton>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default OffshoreNavbar;
