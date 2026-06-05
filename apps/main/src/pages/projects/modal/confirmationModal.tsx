import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-full max-w-sm rounded-xl bg-white p-6'>
        <h3 className='font-semibold'>{title}</h3>
        <p className='mt-2 text-sm text-gray-500'>{description}</p>

        <div className='mt-6 flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='rounded-lg border border-input px-4 py-2 text-sm'
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className='rounded-lg bg-red-500 px-4 py-2 text-sm text-white'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
