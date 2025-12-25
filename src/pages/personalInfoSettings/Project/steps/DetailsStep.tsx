import React from "react";
import { Field } from "formik";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const years = Array.from({ length: 30 }, (_, i) => `${2025 - i}`);

interface DetailsStepProps {
  values: {
    title: string;
    description: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
  };
  errors: {
    title?: string;
    description?: string;
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
  };
}

const DetailsStep = ({ values, errors }: DetailsStepProps) => (
  <div>
    <div className='mb-4'>
      <label className='block text-sm font-medium mb-1'>Project Title</label>
      <Field
        name='title'
        className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
      />
      {errors.title && (
        <div className='text-red-500 text-xs mt-1'>{errors.title}</div>
      )}
    </div>
    <div className='mb-4'>
      <label className='block text-sm font-medium mb-1'>
        Project Description
      </label>
      <Field
        as='textarea'
        name='description'
        maxLength={500}
        className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-20'
      />
      <div className='flex justify-between text-xs mt-1'>
        <span className='text-gray-400'>
          {values.description.length}/500 characters
        </span>
      </div>
      {errors.description && (
        <div className='text-red-500 text-xs mt-1'>{errors.description}</div>
      )}
    </div>
    <div className='flex gap-4 mb-4'>
      <div className='flex-1'>
        <label className='block text-xs font-medium mb-1'>Start Month</label>
        <Field
          as='select'
          name='startMonth'
          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
        >
          <option value=''>Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Field>
        {errors.startMonth && (
          <div className='text-red-500 text-xs mt-1'>{errors.startMonth}</div>
        )}
      </div>
      <div className='flex-1'>
        <label className='block text-xs font-medium mb-1'>Start Year</label>
        <Field
          as='select'
          name='startYear'
          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
        >
          <option value=''>Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Field>
        {errors.startYear && (
          <div className='text-red-500 text-xs mt-1'>{errors.startYear}</div>
        )}
      </div>
      <div className='flex-1'>
        <label className='block text-xs font-medium mb-1'>End Month</label>
        <Field
          as='select'
          name='endMonth'
          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
        >
          <option value=''>Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Field>
        {errors.endMonth && (
          <div className='text-red-500 text-xs mt-1'>{errors.endMonth}</div>
        )}
      </div>
      <div className='flex-1'>
        <label className='block text-xs font-medium mb-1'>End Year</label>
        <Field
          as='select'
          name='endYear'
          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm'
        >
          <option value=''>Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Field>
        {errors.endYear && (
          <div className='text-red-500 text-xs mt-1'>{errors.endYear}</div>
        )}
      </div>
    </div>
  </div>
);

export default DetailsStep;
