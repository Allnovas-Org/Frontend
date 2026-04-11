import React, { useState } from "react";
import { OfferSummary } from "../../../../types";
import PaymentMethodForm from "./paymentMethod";
import OrderSummary from "./orderSummary";
import { ConfirmPaymentModal } from "./confirmModal";

interface Props {
  offer: OfferSummary;
  onEditOffer: () => void;
}

export const SecurePaymentPage = ({ offer, onEditOffer }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-2'>
          Hire for Landing Page Design
        </h1>
        <p className='text-gray-500'>
          Complete the hiring process in 2 simple steps
        </p>
      </div>

      {/* Step Header */}
      <div className='mb-6'>
        <p className='text-sm text-gray-500 mb-1'>Step 2 of 2</p>
        <h2 className='font-semibold text-xl mb-1'>Secure Payment</h2>
        <p className='text-sm text-gray-500'>
          Funds will be held securely until work is approved.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 border border-input rounded-lg p-6'>
        {/* Left Column - Payment Method */}
        <div className='lg:col-span-2'>
          <PaymentMethodForm />

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-between max-w-full mt-3'>
            <button
              onClick={onEditOffer}
              className='rounded-lg border px-6 py-2 text-sm text-red-500 border-red-200 font-semibold'
            >
              Edit Offer
            </button>
            <button
              className='rounded-lg bg-red-500 px-6 py-2 text-sm font-semibold text-white'
              onClick={() => setShowModal(true)}
            >
              Confirm Payment
            </button>
          </div>

          {showModal && (
            <ConfirmPaymentModal onClose={() => setShowModal(false)} />
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className='lg:col-span-1'>
          <OrderSummary offer={offer} />
        </div>
      </div>
    </div>
  );
};
