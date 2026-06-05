import React from "react";

const cardPayment = () => {
  return (
    <div className='rounded-xl border p-6'>
      <h3 className='mb-4 font-medium'>Enter Card Details</h3>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <label className='text-sm text-gray-500'>Cardholder Name</label>
          <input
            className='mt-1 w-full rounded-lg border px-3 py-2'
            placeholder='Mark Brun'
          />
        </div>

        <div className='sm:col-span-2'>
          <label className='text-sm text-gray-500'>Card Number</label>
          <input
            className='mt-1 w-full rounded-lg border px-3 py-2'
            placeholder='1234 678 9012 3456'
          />
        </div>

        <div>
          <label className='text-sm text-gray-500'>Expiry Date</label>
          <input
            className='mt-1 w-full rounded-lg border px-3 py-2'
            placeholder='MM/YY'
          />
        </div>

        <div>
          <label className='text-sm text-gray-500'>CVV</label>
          <input
            className='mt-1 w-full rounded-lg border px-3 py-2'
            placeholder='123'
          />
        </div>
      </div>
    </div>
  );
};

export default cardPayment;
