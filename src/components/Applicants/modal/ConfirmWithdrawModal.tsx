import React from "react";

export interface ConfirmWithdrawModalProps {
  onClose: () => void;
}

const ConfirmWithdrawModal: React.FC<ConfirmWithdrawModalProps> = ({
  onClose,
}) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 '>
    <div className='bg-white h-96 rounded-lg shadow-lg px-10 py-8 max-w-md w-full'>
      <img
        src='/images/applicants/Blob.png'
        alt='Decorative Blob'
        className='mx-auto mb-10'
      />
      <div>
        <h3 className='text-lg font-bold mb-3 text-center'>
          Your proposal has been withdrawn.
        </h3>
        <p className='text-gray-700 font-medium mb-4 text-center'>
          Your proposal for the job was withdrawn. Apply for more jobs to keep
          pushing!
        </p>
      </div>
      <div className='flex justify-center mb-5'>
        <button
          className='px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark text-sm font-medium'
          onClick={() => (window.location.href = "/applicants/find-jobs")}
        >
          Explore more opportunities
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmWithdrawModal;
