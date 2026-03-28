import React from "react";

type Props = {
  onClose: () => void;
};

export const ConfirmPaymentModal = ({ onClose }: Props) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
      <div className='bg-white rounded-lg shadow-lg px-10 py-8 max-w-md w-full'>
        <img
          src='/images/applicants/Blob.png'
          alt='Decorative Blob'
          className='mx-auto mb-10'
        />
        <div>
          <h3 className='text-lg font-bold mb-3 text-center'>
            Payment Confirmed!
          </h3>
          <p className='text-gray-700 font-medium mb-4 text-center'>
            Your payment has been received and is being held securely. The
            freelancer will be notified to start work.
          </p>
        </div>
        <div className='flex justify-center mb-2'>
          <button
            className='px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark text-sm font-medium'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
