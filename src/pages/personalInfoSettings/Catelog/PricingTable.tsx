import React from "react";
import { PricingTier } from "../../../types";

interface PricingTableProps {
  tiers: PricingTier[];
}

const Check = () => (
  <span className='inline-flex items-center justify-center w-5 h-5 rounded bg-black text-white text-xs'>
    ✓
  </span>
);

const PricingTable = ({ tiers }: PricingTableProps) => {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden'>
      <table className='w-full text-sm'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-5 py-4 text-left font-medium'>Service Tiers</th>
            {tiers.map((tier) => (
              <th key={tier.name} className='px-5 py-4 font-medium text-center'>
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className='border-t border-gray-200'>
            <td className='px-5 py-4 font-medium'>Delivery Time</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.deliveryTime}
              </td>
            ))}
          </tr>
          <tr className='border-t bg-gray-50 border-gray-200'>
            <td className='px-5 py-4 font-medium'>Plugins Installations</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.plugins ? <Check /> : "–"}
              </td>
            ))}
          </tr>
          <tr className='border-t border-gray-200'>
            <td className='px-5 py-4 font-medium'>Number Pages</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.pages}
              </td>
            ))}
          </tr>
          <tr className='border-t bg-gray-50 border-gray-200'>
            <td className='px-5 py-4 font-medium'>Responsive Design</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.responsive ? <Check /> : "–"}
              </td>
            ))}
          </tr>
          <tr className='border-t border-gray-200'>
            <td className='px-5 py-4 font-medium'>Revision</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.revisions}
              </td>
            ))}
          </tr>
          <tr className='border-t bg-gray-50 border-gray-200'>
            <td className='px-5 py-4 font-medium'>Design System</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.designSystem ? <Check /> : "–"}
              </td>
            ))}
          </tr>
          <tr className='border-t border-gray-200'>
            <td className='px-5 py-4 font-medium'>Mockup</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center'>
                {tier.mockup ? <Check /> : "–"}
              </td>
            ))}
          </tr>
          <tr className='border-t bg-gray-50 border-gray-200'>
            <td className='px-5 py-4 font-medium'>Price</td>
            {tiers.map((tier) => (
              <td key={tier.name} className='text-center font-semibold'>
                ${tier.price}
              </td>
            ))}
          </tr>
          <tr className='border-t border-gray-200'>
            <td />
            {tiers.map((tier) => (
              <td key={tier.name} className='py-4 text-center'>
                <button className='px-5 py-2 rounded-md bg-black text-white text-xs hover:bg-gray-800'>
                  Order Now
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <footer className='flex items-center justify-between px-5 py-4 border-t border-gray-200 bg-gray-50'>
        <span className='font-medium'>Customize Package</span>
        <button className='px-4 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-100'>
          Send Offer
        </button>
      </footer>
    </div>
  );
};

export default PricingTable;
