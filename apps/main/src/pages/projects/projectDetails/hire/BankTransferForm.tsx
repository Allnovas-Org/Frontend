import React from "react";
import CopyButton from "./CopyButton";
import UploadDropzone from "./UploadDropzone";

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div className='relative'>
    <label className='text-xs font-bold text-gray-400 uppercase tracking-wide'>
      {label}
    </label>
    <input
      readOnly
      value={value}
      className='w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 font-medium text-input mt-1'
    />
    <CopyButton value={value} />
  </div>
);

const BankTransferForm = () => {
  return (
    <div className='mt-6 animate-in fade-in duration-300'>
      <h4 className='text-base font-bold mb-4'>Bank Transfer Details</h4>
      <div className='space-y-3'>
        <ReadOnlyField label='Bank Name' value='First National Bank' />
        <ReadOnlyField
          label='Account Name'
          value='PayFlow Escrow Services LLC'
        />
        <ReadOnlyField label='Account Number' value='4532 8901 2345 6789' />
        <ReadOnlyField label='Routing Number' value='021000021' />
        <ReadOnlyField label='Reference Number' value='PF-2024-AJ-1050' />
        <ReadOnlyField label='Amount to Transfer' value='$1,050.00 USD' />
      </div>
      <div className='mt-6'>
        <h5 className='text-sm font-bold'>Upload Proof of Transfer</h5>
        <p className='text-input text-xs mb-2'>
          Upload a screenshot or receipt of your bank transfer to help us verify
          your payment faster
        </p>
        <UploadDropzone />
      </div>
    </div>
  );
};

export default BankTransferForm;
