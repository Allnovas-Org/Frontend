import React from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import type { CatalogueFormValues } from "../CreateCatalogue";

const BasicInfo: React.FC = () => {
  const { touched, errors } = useFormikContext<CatalogueFormValues>();
  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      <section>
        <h3 className='text-lg font-bold text-gray-900'>Basic Information</h3>
        <p className='text-sm text-gray-500'>
          Enter the essential details for your catalogue.
        </p>
      </section>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <label className='block text-sm font-semibold text-gray-700'>
            Title
          </label>
          <Field
            name='title'
            type='text'
            className='w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500'
            placeholder='e.g. Professional Logo Design'
          />
          <ErrorMessage name='title'>
            {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
          </ErrorMessage>
        </div>
        <div className='space-y-4'>
          <label className='block text-sm font-semibold text-gray-700'>
            Category
          </label>
          <Field
            as='select'
            name='category'
            className='w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500'
          >
            <option value=''>Select category</option>
            <option value='Design'>Design</option>
            <option value='Development'>Development</option>
            <option value='Marketing'>Marketing</option>
          </Field>
          <ErrorMessage name='category'>
            {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
          </ErrorMessage>
        </div>
      </div>
      <div className='space-y-4'>
        <label className='block text-sm font-semibold text-gray-700'>
          Service Summary
        </label>
        <Field
          as='textarea'
          name='summary'
          className='w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500 h-32'
          placeholder='Briefly describe your service...'
        />
        <ErrorMessage name='summary'>
          {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default BasicInfo;
