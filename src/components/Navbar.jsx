import React, { useState } from 'react';
import logo from "../assets/allnova-logo-black.png"
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignupModal from "./SignupFlow/SignupModal";
import SignInModal from "./SignInFlow/SignInModal";

const headerLinks = [
  { title: 'Find Freelancers', url: '#finalCTASection' },
  { title: 'Services', url: '#nichesSection' },
  { title: 'Resources', url: '#resourcesSection' },
  { title: 'About Us', url: '#missionSection' },
  { title: 'Offshore Services', url: '#' },
]

const Navbar = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  }

  const handleNavClick = (url) => {
    if (url === '#') return; // Don't scroll if no URL

    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Close mobile drawer if open
    if (openMobileNav) {
      setOpenMobileNav(false);
    }
  }

  return (
    <>
      <header className="bg-white p-4 w-full flex justify-center">
        <nav className="max-w-6xl max-lg:text-xs w-full max-md:hidden inline-flex items-center justify-between">
          <button onClick={() => handleNavClick('#home')} className="w-[10%]">
            <img src={logo} alt="AllNova Logo" className="w-full" />
          </button>
          <ul className="inline-flex space-x-12 max-lg:space-x-6">
            {headerLinks.map((link) => (
              <li
                key={link.title}
                onClick={() => handleNavClick(link.url)}
                className='text-black hover:text-gray-500 transition cursor-pointer'
              >
                {link.title}
              </li>
            ))}
          </ul>
          <div className='inline-flex gap-x-4 items-center'>
            <button
              onClick={() => setIsSignInModalOpen(true)}
              className="bg-transparent text-primary px-[1.2rem] py-[0.45rem] rounded-md hover:text-primary/80 transition"
            >
              Sign in
            </button>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-primary text-white px-[1.2rem] py-[0.45rem] rounded-full hover:bg-primary/70 transition"
            >
              Join
            </button>
          </div>
        </nav>
        <nav className='w-full hidden max-md:inline-flex items-center justify-between'>
          <button
            onClick={toggleMobileNav}
            className='text-3xl font-bold'
            aria-label="Toggle mobile menu"
            aria-expanded={openMobileNav}
          >
            <MenuIcon />
          </button>
          <img src={logo} alt="AllNova Logo" className="w-[30%]" />
          <button
            onClick={() => setIsSignupModalOpen(true)}
            className="bg-transparent text-primary px-[1.2rem] py-[0.45rem] rounded-md hover:text-primary/80 transition"
          >
            Join
          </button>
        </nav>
        <Drawer anchor='left' open={openMobileNav} onClose={toggleMobileNav}>
          <div className='w-64 p-4 flex flex-col justify-between h-full pb-8'>
            <ul className='flex flex-col space-y-6'>
              <button onClick={() => handleNavClick('#home')} className="w-4/5 mx-auto">
                <img src={logo} alt="AllNova Logo" className="w-full" />
              </button>
              {headerLinks.map((link) => (
                <li
                  key={link.title}
                  onClick={() => handleNavClick(link.url)}
                  className='text-black font-medium hover:text-gray-500 transition cursor-pointer'
                >
                  {link.title}
                </li>
              ))}
            </ul>
            <div className='flex flex-col gap-y-3'>
              <button
                onClick={() => {
                  setIsSignInModalOpen(true);
                  setOpenMobileNav(false);
                }}
                className="bg-transparent text-primary px-[1.2rem] py-[0.45rem] rounded-md hover:text-primary/80 transition border border-primary"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setIsSignupModalOpen(true);
                  setOpenMobileNav(false);
                }}
                className="bg-primary text-white px-[1.2rem] py-[0.45rem] rounded-full hover:bg-primary/70 transition"
              >
                Join
              </button>
            </div>
          </div>
        </Drawer>
      </header>

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
  )
}

export default Navbar;