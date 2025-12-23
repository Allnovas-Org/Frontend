import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import type { CatalogueFormValues } from "../CreateCatalogue";

const PricingTable: React.FC = () => {
  useFormikContext<CatalogueFormValues>();
  const tiers = ["Basic", "Standard", "Premium"];
  const features = [
    "Plugin Installation",
    "Responsive Design",
    "Icon Library",
    "Design System",
    "Mockup",
  ];

  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 shadow-sm'>
      <table className='w-full text-left text-sm'>
        <thead className='bg-gray-50 border-b border-gray-200'>
          <tr>
            <th className='p-4 font-semibold text-gray-700'>Service Tiers</th>
            {tiers.map((tier, i) => (
              <th
                key={`${tier}-${i}`}
                className='p-4 font-semibold text-center text-gray-700'
              >
                {tier} ✎
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          <tr>
            <td className='p-4 font-medium text-gray-600'>Delivery Time</td>
            {tiers.map((tier, i) => (
              <td key={tier} className='p-4 text-center'>
                <Field
                  as='select'
                  name={`pricing[${i}].deliveryTime`}
                  className='border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-red-500'
                >
                  <option value=''>Select</option>
                  <option value='1 day'>1 day</option>
                  <option value='2 days'>2 days</option>
                  <option value='3 days'>3 days</option>
                  <option value='5 days'>5 days</option>
                  <option value='7 days'>7 days</option>
                </Field>
                <ErrorMessage name={`pricing[${i}].deliveryTime`}>
                  {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
                </ErrorMessage>
              </td>
            ))}
          </tr>
          {/* Feature Checkboxes */}
          {features.map((feature, fIdx) => (
            <tr key={`${feature}-${fIdx}`}>
              <td className='p-4 text-gray-600'>{feature}</td>
              {tiers.map((tier, tIdx) => (
                <td key={tier} className='p-4 text-center'>
                  <Field
                    type='checkbox'
                    name={`pricing[${tIdx}].features`}
                    value={feature}
                    className='w-4 h-4 rounded border-gray-300 text-black focus:ring-0'
                  />
                </td>
              ))}
            </tr>
          ))}
          {/* Price Row */}
          <tr className='bg-gray-50/50'>
            <td className='p-4 font-bold text-gray-700'>Price</td>
            {tiers.map((tier, i) => (
              <td key={tier} className='p-4 text-center'>
                <div className='flex items-center justify-center gap-1'>
                  <span className='text-gray-400'>$</span>
                  <Field
                    type='text'
                    name={`pricing[${i}].price`}
                    placeholder='200'
                    className='w-20 border border-gray-300 rounded px-2 py-1 text-center font-bold'
                  />
                </div>
                <ErrorMessage name={`pricing[${i}].price`}>
                  {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
                </ErrorMessage>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
