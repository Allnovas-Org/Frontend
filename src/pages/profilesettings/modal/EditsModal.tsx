// components/ui/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSave: () => void;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-2xl rounded-2xl bg-white shadow-xl'>
        <div className='flex items-center justify-between border-b border-gray-100 p-6'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>{title}</h2>
            {subtitle && <p className='text-sm text-gray-500'>{subtitle}</p>}
          </div>
          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='rounded-lg border border-purple-600 px-6 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50'
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className='rounded-lg bg-purple-700 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-800'
            >
              Save Change
            </button>
          </div>
        </div>
        <div className='max-h-[80vh] overflow-y-auto p-6'>{children}</div>
      </div>
    </div>
  );
};

export default EditModal;
