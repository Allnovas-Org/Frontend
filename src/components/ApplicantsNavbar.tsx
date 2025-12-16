import React, { useState, useRef } from "react";
import ActivitiesDrawer from "./Applicants/ActivitiesDrawer";
import { NavLink } from "react-router-dom";
import { Bell, UserRound, Plane, Settings } from "lucide-react";
import Logo from "../assets/AllNova black 2 (1).png";
import user from "../assets/applicants/user.png";
import UserDropdown from "./Applicants/UserDropdown";

const navLinks = [
  { name: "Find Jobs", path: "/applicants/find-jobs" },
  { name: "Work History", path: "/applicants/work-history" },
  { name: "Saved Jobs", path: "/applicants/saved-jobs" },
  { name: "Messages", path: "/applicants/messages" },
  { name: "Community", path: "/applicants/community" },
];

const ApplicantsNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const userBtnRef = useRef<HTMLButtonElement>(null);

  // Example activities data
  // Notification data with timestamp
  type Notification = {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    timestamp: Date;
  };

  const notifications: Notification[] = [
    {
      id: "1",
      icon: (
        <span className='w-8 h-8 flex items-center justify-center rounded-full border border-red-200 '>
          <UserRound className='w-5 h-5 text-red-500' />
        </span>
      ),
      title: "System Alert",
      subtitle:
        "A recent sign-in to your Allnova account(cc6a4272) from an unknown device or browser.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "2",
      icon: (
        <span className='w-8 h-8 flex items-center justify-center rounded-full border border-blue-200 '>
          <Plane className='w-5 h-5 text-blue-500' />
        </span>
      ),
      title: "System",
      subtitle:
        "Your proposal for UI/UX designer needed for simple design task was viewed",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: "3",
      icon: (
        <span className='w-8 h-8 flex items-center justify-center rounded-full border border-green-200 '>
          <Settings className='w-5 h-5 text-green-500' />
        </span>
      ),
      title: "System maintenance",
      subtitle: "Scheduled maintenance will occur from 2-4AM.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    },
    {
      id: "4",
      icon: (
        <span className='w-8 h-8 flex items-center justify-center rounded-full border border-green-200 '>
          <Settings className='w-5 h-5 text-green-500' />
        </span>
      ),
      title: "System maintenance",
      subtitle: "Scheduled maintenance will occur from 2-4AM.",
      timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000), // 30 hours ago (Yesterday)
    },
  ];

  // Helper to group notifications by Today/Yesterday etc
  function groupNotificationsByDate(
    notifications: Notification[]
  ): Record<string, Notification[]> {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    function isSameDay(d1: Date, d2: Date): boolean {
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    }
    const grouped: Record<string, Notification[]> = {
      Today: [],
      Yesterday: [],
    };
    notifications.forEach((n: Notification) => {
      if (isSameDay(n.timestamp, today)) {
        grouped.Today.push(n);
      } else if (isSameDay(n.timestamp, yesterday)) {
        grouped.Yesterday.push(n);
      }
    });
    return grouped;
  }

  // Helper to get "x hours ago"
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  // Prepare activities for ActivitiesDrawer
  type Activity = {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    time: string;
  };
  const activities: Record<string, Activity[]> = {};
  const grouped = groupNotificationsByDate(notifications);
  Object.entries(grouped).forEach(([key, arr]) => {
    activities[key] = arr.map((n: Notification) => ({
      id: n.id,
      icon: n.icon,
      title: n.title,
      subtitle: n.subtitle,
      time: getTimeAgo(n.timestamp),
    }));
  });

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

  // Handle drawer open/close with animation
  React.useEffect(() => {
    if (isDrawerOpen) {
      setDrawerVisible(true);
    } else {
      // Wait for animation to finish before unmounting
      const timeout = setTimeout(() => setDrawerVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isDrawerOpen]);

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
        <div className='flex items-center gap-3 relative'>
          {/* Bell Icon triggers ActivitiesDrawer */}
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center rounded-full border border-input bg-white focus:outline-none'
            aria-label='Open activities drawer'
            onClick={() => setIsDrawerOpen(true)}
            style={{ position: "relative", zIndex: 52 }}
          >
            <Bell className='w-4 h-4 text-gray-500' />
          </button>
          {/* User Dropdown */}
          <button
            type='button'
            className='focus:outline-none'
            ref={userBtnRef}
            onClick={() => setIsDropdownOpen((v) => !v)}
            aria-label='Open user menu'
            style={{ position: "relative", zIndex: 51 }}
          >
            <img
              src={user}
              alt='User'
              className='w-8 h-8 rounded-full object-cover border border-gray-300'
            />
          </button>
          <UserDropdown
            open={isDropdownOpen}
            anchorRef={userBtnRef}
            onClose={() => setIsDropdownOpen(false)}
          />
          {/* Activities Drawer Sidebar */}
          {drawerVisible && (
            <ActivitiesDrawer
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              activities={activities}
            />
          )}
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
