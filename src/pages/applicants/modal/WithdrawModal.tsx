import React from "react";

export interface WithdrawModalProps {
  onCancel: () => void;
  onContinue: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onCancel,
  onContinue,
}) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-30'>
    <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
      <h3 className='text-lg font-bold mb-2'>Withdraw Proposal</h3>
      <p className='text-gray-700 font-normal mb-3 text-sm'>
        Are you sure you want to withdraw your proposal for this job?
      </p>

      <div className='flex justify-center gap-3'>
        <button
          className='px-4 py-2 w-6/12 rounded border border-input text-gray-dark hover:bg-gray-300 cursor-pointer text-sm font-medium'
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className='px-4 py-2 w-6/12 rounded bg-primary text-white hover:bg-red-700 cursor-pointer text-sm font-medium'
          onClick={onContinue}
        >
          Yes, Continue
        </button>
      </div>
    </div>
  </div>
);

export default WithdrawModal;
