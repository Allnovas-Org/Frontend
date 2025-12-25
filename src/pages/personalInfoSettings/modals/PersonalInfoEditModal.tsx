import React, { useRef, useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  className = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-9999 flex items-center justify-center bg-black/75 p-4'>
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 ${className} max-h-[90vh] overflow-auto`}
      >
        <button className='absolute top-4 right-4' onClick={onClose}>
          <X className='w-5 h-5 text-gray-500' />
        </button>
        <h2 className='text-xl font-bold mb-1'>{title}</h2>
        {subtitle && <p className='text-gray-dark mb-4'>{subtitle}</p>}
        <div className='border border-gray-light mb-4' />
        {children}
      </div>
    </div>
  );
};

export default ProfileModal;
