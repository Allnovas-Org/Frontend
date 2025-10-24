import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/AllNova black 2 (1).png";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white backdrop-blur-md z-50 2xl:px-[200px]">
      <nav className="flex justify-between items-center px-6 lg:px-12 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="AllNova Logo" className="h-12 w-auto" />
        </div>

        {/* Center Nav Links */}
        <div className="hidden lg:flex">
          <ul className="flex space-x-10 items-center">
            <li>
              <NavLink
                to="/freelancers"
                className="hover:text-[#F05658] transition-colors duration-200"
              >
                Find Freelancers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="hover:text-[#F05658] transition-colors duration-200"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pro"
                className="hover:text-[#F05658] transition-colors duration-200"
              >
                Go Pro
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/offshore"
                className="hover:text-[#F05658] transition-colors duration-200"
              >
                Offshore Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-[#F05658] transition-colors duration-200"
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <ul className="flex items-center space-x-6">
          <li>
            <NavLink
              to="/signin"
              className="text-[#F05658] hover:text-[#F05640] transition-colors duration-200"
            >
              Sign In
            </NavLink>
          </li>
          <li className="hidden lg:flex">
            <NavLink to="/join">
              <button
                className="bg-[#F05658] hover:bg-[#c16456] rounded-2xl px-5 text-white py-1 
                         transition-colors duration-200 focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-[#F05658]"
              >
                Join
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
