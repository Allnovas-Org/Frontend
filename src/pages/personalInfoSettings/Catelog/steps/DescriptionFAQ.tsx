import React from "react";
import { Trash2, Plus } from "lucide-react";
import { useFormikContext, Field, FieldArray, ErrorMessage } from "formik";
import type { CatalogueFormValues } from "../CreateCatalogue";

const DescriptionFAQ: React.FC = () => {
  const { values } = useFormikContext<CatalogueFormValues>();
  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
      <section>
        <h3 className='text-lg font-bold text-gray-900'>Description & FAQ</h3>
        <p className='text-sm text-gray-500'>
          Provide detailed information about your service and answer common
          questions.
        </p>
      </section>
      {/* Service Description */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold'>
          Description <span className='text-red-500'>*</span>
          <p className='text-xs text-gray-400'>
            Provide detailed information about your service and answer common
            questions.
          </p>
        </label>
        <Field
          as='textarea'
          name='description'
          maxLength={1200}
          placeholder='Provide a comprehensive description of your service'
          className='w-full h-40 p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none'
        />
        <div className='text-right text-[10px] text-gray-400'>
          {values.description.length}/1200 Characters
        </div>
        <ErrorMessage name='description'>
          {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
        </ErrorMessage>
      </div>
      {/* Your Process (optional, now in form) */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold'>Your Process</label>
        <p className='text-xs text-gray-400'>
          Explain your workflow and what clients can expect
        </p>
        <Field
          as='textarea'
          name='process'
          placeholder='1. Initial consultation to understand your needs. 2. First concept sent. 3. Unlimited revisions until you are satisfied.'
          className='w-full h-40 p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none'
        />
      </div>
      {/* FAQ Section */}
      <FieldArray name='faqs'>
        {({ push, remove }) => (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h4 className='text-sm font-bold'>
                  Frequently Asked Questions
                </h4>
                <p className='text-xs text-gray-400'>
                  Answer common questions to help clients make informed
                  decisions.
                </p>
              </div>
              <button
                type='button'
                onClick={() => push({ q: "", a: "" })}
                className='flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-purple-800'
              >
                <Plus size={14} /> Add FAQ
              </button>
            </div>
            {values.faqs &&
              values.faqs.length > 0 &&
              values.faqs.map((faq, index) => (
                <div
                  key={index}
                  className='p-6 border border-gray-100 rounded-xl bg-white shadow-sm space-y-4 relative'
                >
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='absolute top-4 right-4 text-gray-400 hover:text-red-500'
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className='space-y-1'>
                    <label className='text-xs font-bold text-gray-700'>
                      Question {index + 1}
                    </label>
                    <Field
                      name={`faqs[${index}].q`}
                      type='text'
                      placeholder='E.g. What file formats will I receive?'
                      className='w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500'
                    />
                    <ErrorMessage name={`faqs[${index}].q`}>
                      {(msg) => (
                        <div className='text-xs text-red-500'>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className='space-y-1'>
                    <label className='text-xs font-bold text-gray-700'>
                      Answer
                    </label>
                    <Field
                      as='textarea'
                      name={`faqs[${index}].a`}
                      placeholder='Provide a clear and helpful answer'
                      className='w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500'
                    />
                    <ErrorMessage name={`faqs[${index}].a`}>
                      {(msg) => (
                        <div className='text-xs text-red-500'>{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              ))}
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default DescriptionFAQ;
