import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bell } from "lucide-react";
import Logo from "../assets/AllNova black 2 (1).png";
import user from "../assets/applicants/user.png";

const navLinks = [
  { name: "Find Jobs", path: "/applicants/find-jobs" },
  { name: "Work History", path: "/applicants/work-history" },
  { name: "Saved Jobs", path: "/applicants/saved-jobs" },
  { name: "Messages", path: "/applicants/messages" },
  { name: "Community", path: "/applicants/community" },
];

const ApplicantsNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-red-800 font-bold"
        : "text-gray-700 hover:text-[#FF5E60] font-semibold"
    }`;
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 transition-colors duration-200 ${
      isActive
        ? "text-red-900 font-semibold bg-red-50"
        : "text-gray-700 hover:text-[#F05658] hover:bg-gray-50"
    }`;

  return (
    <div className='fixed top-0 left-0 w-full mb-10 bg-white backdrop-blur-md z-50 2xl:px-[200px]'>
      {/* Desktop Navigation */}
      <nav className='hidden lg:flex justify-between items-center px-6 lg:px-19 py-3'>
        {/* Logo */}
        <div className='flex items-center'>
          <img src={Logo} alt='AllNova Logo' className='h-8 w-auto' />
        </div>
        {/* Center Nav Links */}
        <div className='flex'>
          <ul className='flex space-x-10 items-center text-semibold'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path} className={navLinkClass}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Right Section */}
        <div className='flex items-center space-x-6'>
          <span className='w-8 h-8 flex items-center justify-center rounded-full border border-input bg-white'>
            <Bell className='w-4 h-4 text-gray-500' />
          </span>
          <img
            src={user}
            alt='User'
            className='w-8 h-8 rounded-full object-cover'
          />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className='lg:hidden flex justify-between items-center px-4 py-3 bg-[#F056581A]'>
        {/* Mobile Menu Button - LEFT */}
        <button
          onClick={toggleMobileMenu}
          className='flex flex-col justify-center items-center w-10 h-10 focus:outline-none group z-50'
          aria-label='Toggle menu'
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
        {/* Logo - CENTER */}
        <div className='absolute left-1/2 transform -translate-x-1/2'>
          <img src={Logo} alt='AllNova Logo' className='h-10 w-auto' />
        </div>
        {/* User - RIGHT */}
        <img
          src='/images/user-photo.jpg'
          alt='User'
          className='w-8 h-8 rounded-full object-cover'
        />
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className='px-6 py-4 bg-white border-t border-gray-200'>
          <ul className='space-y-1'>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={mobileNavLinkClass}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsNavbar;
