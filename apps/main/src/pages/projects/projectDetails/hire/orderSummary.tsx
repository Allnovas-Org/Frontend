// components/payment/OrderSummary.tsx
import React from "react";
import { ShieldCheck } from "lucide-react";
import { OfferSummary } from "../../../../types";

interface Props {
  offer: OfferSummary;
}

const OrderSummary = ({ offer }: Props) => {
  const platformFee = offer.budget * 0.05;
  const total = offer.budget + platformFee;
  const usdtAmount = total.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <aside className=' p-6'>
      <div className='mb-4 rounded-lg border border-input p-4 text-sm '>
        <div className='mb-2 flex items-center gap-2 font-medium'>
          <ShieldCheck size={16} />
          <span>Payment Protection</span>
        </div>
        <p>
          Your payment is held securely in escrow until you approve the
          completed work. You&apos;re protected by our Money Back Guarantee.
        </p>
      </div>

      <h3 className='mb-4 font-medium'>Order Summary</h3>
      <div className='space-y-2 text-sm'>
        <p className='font-medium'>Project with {offer.freelancerName}</p>

        <p className='text-gray-dark'>
          {offer.type === "fixed" ? "Fixed Price" : "Milestones"} ·{" "}
          {offer.duration}
        </p>
      </div>
      {offer.milestones && (
        <div className='mt-4 space-y-2 border-t border-input pt-4 text-sm'>
          <p className='font-medium'>Milestones Breakdown</p>

          {offer.milestones.map((m) => (
            <div key={m.id} className='flex justify-between'>
              <span>
                {m.title} · {m.duration}
              </span>
              <span>${m.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
      <div className='mt-4 space-y-2 border-t border-input pt-4 text-sm'>
        <div className='flex justify-between'>
          <span>Project budget</span>
          <span>${offer.budget.toFixed(2)}</span>
        </div>

        <div className='flex justify-between text-gray-dark'>
          <span>Platform fee (5%)</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
      </div>
      <div className='mt-4 flex justify-between border-t border-input pt-4 font-semibold'>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className='mt-2 flex justify-between text-sm'>
        <span>USDT amount</span>
        <span>{usdtAmount} USDT</span>
      </div>
      <div className='bg-blue-100 border border-blue-100 text-blue-500 mt-6 rounded-lg p-4 text-sm'>
        <h5 className='font-medium mb-2'>Important Notification</h5>
        <ul className='list-disc list-inside'>
          <li>Transfer the exact amount shown</li>
          <li>Include the reference number</li>
          <li>Keep your transfer receipt</li>
          <li>Bank transfers take 1-3 business days to process</li>
        </ul>
      </div>
    </aside>
  );
};

export default OrderSummary;
