import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/AllNova black 2 (1).png";
import SignupModal from "./SignupFlow/SignupModal";
import SignInModal from "./SignInFlow/SignInModal";

const Navbar = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-red-800 font-bold"
        : "text-gray-700 hover:text-[#FF5E60] font-semibold"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block py-3 px-4 transition-colors duration-200 ${
      isActive
        ? "text-red-900 font-semibold bg-red-50"
        : "text-gray-700 hover:text-[#F05658] hover:bg-gray-50"
    }`;

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white  backdrop-blur-md z-50 2xl:px-[200px]">
        <nav className="flex justify-between items-center px-6 lg:px-12 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="AllNova Logo" className="h-10 w-auto" />
          </div>

          {/* Center Nav Links - Desktop */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-10 items-center text-semibold">
              <li>
                <NavLink to="/freelancers" className={navLinkClass}>
                  Find Freelancers
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={navLinkClass}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/pro" className={navLinkClass}>
                  Go Pro
                </NavLink>
              </li>
              <li>
                <NavLink to="/offshore" className={navLinkClass}>
                  Offshore Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClass}>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="text-[#F05658] hover:text-[#F05640] transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-[#F05658] hover:bg-[#c16456] rounded-2xl px-5 text-white py-1 
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-[#F05658]"
            >
              Join
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 
                     focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-6 py-4 bg-white border-t border-gray-200">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/freelancers"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  Find Freelancers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pro"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  Go Pro
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/offshore"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  Offshore Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  About Us
                </NavLink>
              </li>
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
              <button
                onClick={() => {
                  setIsSignInModalOpen(true);
                  closeMobileMenu();
                }}
                className="w-full text-[#F05658] hover:text-[#F05640] py-2 
                         transition-colors duration-200 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsSignupModalOpen(true);
                  closeMobileMenu();
                }}
                className="w-full bg-[#F05658] hover:bg-[#c16456] rounded-2xl 
                         text-white py-2 transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-[#F05658]"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />

      {/* SignIn Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </>
  );
};

export default Navbar;