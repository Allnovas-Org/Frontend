import React from "react";

const CardPaymentForm = () => {
  return (
    <div className='mt-6 animate-in fade-in duration-300'>
      <h4 className='text-base font-bold mb-4'>Enter Card Details</h4>
      <div className='space-y-4'>
        <div>
          <label className='text-xs font-bold text-gray-600'>
            Cardholder Name
          </label>
          <input
            type='text'
            placeholder='Mark Brun'
            className='w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50/30 focus:outline-none focus:ring-2 focus:ring-red-500/20 mt-1'
          />
        </div>
        <div>
          <label className='text-xs font-bold text-gray-600'>Card Number</label>
          <input
            type='number'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder='1234 678 9012 3456'
            className='w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50/30 focus:outline-none mt-1'
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='text-xs font-bold text-gray-600'>
              Expiry Date
            </label>
            <input
              type='text'
              placeholder='MM/YY'
              className='w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50/30 focus:outline-none mt-1'
            />
          </div>
          <div>
            <label className='text-xs font-bold text-gray-600'>CVV</label>
            <input
              type='number'
              inputMode='numeric'
              pattern='[0-9]*'
              placeholder='123'
              className='w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50/30 focus:outline-none mt-1'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;
