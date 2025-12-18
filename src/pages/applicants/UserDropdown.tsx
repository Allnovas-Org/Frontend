import React, { useEffect, useRef, useState } from "react";
import user from "../../assets/applicants/user.png";
import {
  UserRound,
  ChartColumnBig,
  Crown,
  UsersRound,
  Settings,
  LogOut,
} from "lucide-react";

interface UserDropdownProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
}

import { useNavigate } from "react-router-dom";

const DropdownButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <button
    className='flex items-center gap-3 px-5 py-3 hover:bg-gray-50 w-full text-left'
    onClick={onClick}
  >
    {icon}
    <span className='text-gray-700'>{label}</span>
  </button>
);

const UserDropdown: React.FC<UserDropdownProps> = ({
  open,
  anchorRef,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Use fadeIn when open, fadeOut when closed
  const dropdownClass = open
    ? "animate-fadeIn absolute right-0 top-12 w-72 bg-white shadow-xl rounded-lg border border-gray-200 z-10 transition-all duration-300"
    : "animate-fadeOut absolute right-0 top-12 w-72 bg-white shadow-xl rounded-lg border border-gray-200 z-10 pointer-events-none transition-all duration-300";

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, anchorRef, onClose]);

  // Only render if open or closing (for fadeOut)
  if (!open) return null;

  const menuRows = [
    {
      key: "user",
      content: (
        <div className='flex items-center gap-3 px-5 py-4 border-b border-input'>
          <img
            src={user}
            alt='User'
            className='w-9 h-9 rounded-full object-cover border border-gray-300'
          />
          <div className='flex flex-col'>
            <span className='font-semibold text-gray-900 text-base'>
              John Doe
            </span>
            <span className='text-xs text-gray-500'>Freelancer</span>
          </div>
        </div>
      ),
    },
    {
      key: "links1",
      content: (
        <div className='flex flex-col border-b border-input'>
          <DropdownButton
            icon={<UserRound className='w-5 h-5 text-gray-dark' />}
            label='Personal Information'
            onClick={() => {
              navigate("/profile/settings");
              onClose();
            }}
          />
          <DropdownButton
            icon={<ChartColumnBig className='w-5 h-5 text-gray-dark' />}
            label='My stats'
          />
          <DropdownButton
            icon={<Crown className='w-5 h-5 text-gray-dark' />}
            label='Go Pro'
          />
        </div>
      ),
    },
    {
      key: "links2",
      content: (
        <div className='flex flex-col border-b border-input'>
          <DropdownButton
            icon={<UsersRound className='w-5 h-5 text-gray-dark' />}
            label='Switch Accounts'
          />
          <DropdownButton
            icon={<Settings className='w-5 h-5 text-gray-dark' />}
            label='Account Settings'
          />
        </div>
      ),
    },
    {
      key: "logout",
      content: (
        <div className='flex flex-col'>
          <DropdownButton
            icon={<LogOut className='w-5 h-5 text-gray-dark' />}
            label='Logout'
          />
        </div>
      ),
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className={dropdownClass}
      tabIndex={-1}
      role='menu'
      aria-hidden={!open}
    >
      {menuRows.map((row) => (
        <React.Fragment key={row.key}>{row.content}</React.Fragment>
      ))}
    </div>
  );
};

export default UserDropdown;
