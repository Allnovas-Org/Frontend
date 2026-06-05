import React from "react";

interface ActionResultModalProps {
  open: boolean;
  title: string;
  description: string;
  secondaryLabel: string;
  primaryLabel: string;
  onSecondaryClick: () => void;
  onPrimaryClick: () => void;
}

const ActionResultModal = ({
  open,
  title,
  description,
  secondaryLabel,
  primaryLabel,
  onSecondaryClick,
  onPrimaryClick,
}: ActionResultModalProps) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
      <div className='bg-white rounded-lg shadow-lg px-10 py-8 max-w-md w-full'>
        <img
          src='/images/applicants/Blob.png'
          alt='Decorative Blob'
          className='mx-auto mb-10'
        />
        <div>
          <h3 className='text-lg font-bold mb-3 text-center'>{title}</h3>
          <p className='text-gray-700 font-medium mb-4 text-center'>
            {description}
          </p>
        </div>
        <div className='flex justify-center gap-3 mb-2'>
          <button
            className='px-4 py-2 rounded border border-input text-sm font-medium'
            onClick={onSecondaryClick}
          >
            {secondaryLabel}
          </button>
          <button
            className='px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark text-sm font-medium'
            onClick={onPrimaryClick}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionResultModal;
