import React from "react";
import { OfferType } from "../../../../types";
import { CheckCircle2, MoveRight } from "lucide-react";

interface Props {
  onSelect: (type: OfferType) => void;
}

const OfferTypeSelector = ({ onSelect }: Props) => {
  return (
    <div className='mx-auto max-w-2xl space-y-6'>
      {/* Global Header */}
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
        <p className='text-sm text-gray-500 mb-1'>Step 1 of 2</p>
        <h2 className='text-xl font-semibold'>Create your offer</h2>
        <p className='text-sm text-gray-500 mt-1'>
          Choose how you want to structure the project
        </p>
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        {/* Fixed Price */}
        <div className='w-full border border-input rounded-xl p-6'>
          <h3 className='font-medium mb-1 text-xl'>
            Fixed Price
            <span className='ml-2 text-xs border border-text-500 text-blue-500 bg-blue-100 px-1 py-0.5 rounded-full'>
              Initial plan
            </span>
          </h3>

          <p className='text-sm text-gray-500 mb-4'>
            Perfect for straightforward projects.
          </p>

          <ul className='text-sm text-gray-600 space-y-2 mb-6'>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='w-4 h-4 text-green-500' />
              Simple one-time payment
            </li>

            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='w-4 h-4 text-green-500' />
              Clear deliverables and deadline
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='w-4 h-4 text-green-500' />
              Funds released upon completion
            </li>
          </ul>

          <div className='border border-input my-4'></div>

          <button
            onClick={() => onSelect("fixed")}
            className='text-primary text-sm flex items-center gap-1'
          >
            Select <MoveRight className='w-4 h-4' />
          </button>
        </div>

        {/* Milestones */}
        <div className='w-full border border-input rounded-xl p-6'>
          <h3 className='font-medium mb-1 text-xl'>Milestones</h3>

          <p className='text-sm text-gray-500 mb-4'>
            Ideal for complex projects with phases.
          </p>

          <ul className='text-sm text-gray-600 space-y-2 mb-6'>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='w-4 h-4 text-green-500' />
              Pay as you go
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='w-4 h-4 text-green-500' />
              Review work per stage
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='w-4 h-4 text-green-500' />
              More control
            </li>
          </ul>

          <div className='border border-input my-4'></div>

          <button
            onClick={() => onSelect("milestone")}
            className='text-primary text-sm font-medium'
          >
            Select →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferTypeSelector;
