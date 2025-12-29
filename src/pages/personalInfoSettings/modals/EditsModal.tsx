import React, { ReactNode } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSave?: () => void;
  children: ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  onSave,
  children,
}) => {
  if (!isOpen) return null;
  // Click outside to close the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
      onClick={handleBackdropClick}
    >
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-xl p-8 relative overflow-y-auto max-h-[90vh]'>
        <div className='flex items-center justify-between mb-1'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <div className='flex gap-2'>
            <button
              className='text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg border border-gray-200 font-semibold'
              onClick={onClose}
            >
              Cancel
            </button>
            {onSave && (
              <button
                className='bg-purple text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-800 transition'
                onClick={onSave}
              >
                Save
              </button>
            )}
          </div>
        </div>
        {subtitle && <p className='text-gray-500 mb-4 text-sm'>{subtitle}</p>}
        <div className='border-b border-gray-200 mb-4' />
        {children}
      </div>
    </div>
  );
};

export default EditModal;
