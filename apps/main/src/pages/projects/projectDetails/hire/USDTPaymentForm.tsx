import React from "react";
import CopyButton from "./CopyButton";
import UploadDropzone from "./UploadDropzone";

const USDTPaymentForm = () => {
  const walletAddress = "TYAsr5UV6HEcXatwdFQfmLVUqQQQMUxHLS";

  return (
    <div className='mt-6 animate-in fade-in duration-300'>
      <h4 className='text-base font-bold mb-4'>USDT (Tether) Payment</h4>
      <div className='space-y-3'>
        <div className='relative'>
          <label className='text-xs font-bold text-gray-400 uppercase tracking-wide'>
            Network
          </label>
          <input
            readOnly
            value='TRC-20 (Recommended)'
            className='w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 font-bold text-gray-400 mt-1'
          />
          <CopyButton value='TRC-20 (Recommended)' />
        </div>

        <div className='relative'>
          <label className='text-xs font-bold text-gray-400 uppercase tracking-wide'>
            Wallet Address
          </label>
          <input
            readOnly
            value={walletAddress}
            className='w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 font-medium text-input mt-1'
          />
          <CopyButton value={walletAddress} />
        </div>

        <div className='flex justify-center py-4'>
          <div className='w-32 h-32 border border-gray-100 rounded-2xl p-2 flex items-center justify-center bg-white shadow-sm'>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`}
              alt='QR Code'
            />
          </div>
        </div>

        <div className='relative'>
          <label className='text-xs font-bold text-gray-400 uppercase tracking-wide'>
            Amount to Send
          </label>
          <input
            readOnly
            value='1,050 USDT'
            className='w-full h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 font-medium text-input mt-1'
          />
          <CopyButton value='1,050 USDT' />
        </div>

        <div>
          <label className='text-xs font-bold text-gray-400 uppercase tracking-wide'>
            Transaction ID/Hash
          </label>
          <input
            type='text'
            placeholder='Paste your transaction ID after sending'
            className='w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50/30 focus:outline-none mt-1'
          />
        </div>
      </div>

      <div className='mt-6'>
        <h5 className='text-sm font-bold'>Upload Proof of Transfer</h5>
        <p className='text-input text-xs'>
          Upload a screenshot or receipt of your bank transfer to help us verify
          your payment faster
        </p>
        <UploadDropzone />
      </div>
    </div>
  );
};

export default USDTPaymentForm;
