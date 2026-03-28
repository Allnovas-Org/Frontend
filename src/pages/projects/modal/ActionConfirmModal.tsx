import React from "react";

interface ActionConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ActionConfirmModal = ({
  open,
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Yes, continue",
  onCancel,
  onConfirm,
}: ActionConfirmModalProps) => {
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
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className='rounded-lg bg-primary px-4 py-2 text-sm text-white'
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionConfirmModal;
