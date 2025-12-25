// components/steps/Requirements.tsx

import React from "react";
import { Trash2, Plus } from "lucide-react";
import { useFormikContext, Field, FieldArray, ErrorMessage } from "formik";
import type { CatalogueFormValues } from "../CreateCatalogue";

const fileRequirements = [
  {
    label: "Logo files (if applicable)",
    sub: "AI, EPS, SVG, or high-res PNG",
  },
  {
    label: "Brand guidelines",
    sub: "PDF or document with brand colors, fonts, etc.",
  },
  {
    label: "Reference images",
    sub: "Examples or inspiration for the project",
  },
];

const Requirements: React.FC = () => {
  const { values } = useFormikContext<CatalogueFormValues>();
  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
      <section>
        <h3 className='text-lg font-bold text-gray-900'>Requirements</h3>
        <p className='text-sm text-gray-500'>
          Specify what you need from clients to get started on their project.
        </p>
      </section>

      {/* General Instructions */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold text-gray-700'>
          General Instruction
        </label>
        <p className='text-xs text-gray-400'>
          Provide overall guidance on what clients should prepare before
          ordering
        </p>
        <Field
          as='textarea'
          name='requirements.general'
          placeholder='Provide overall guidance on what clients should prepare before ordering'
          className='w-full h-32 p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50/20'
        />
        <ErrorMessage name='requirements.general'>
          {(msg) => <div className='text-xs text-red-500'>{msg}</div>}
        </ErrorMessage>
      </div>

      {/* Specific Requirements List */}
      <FieldArray name='requirements.specific'>
        {({ push, remove }) => (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h4 className='text-sm font-bold text-gray-800'>
                  Specific Requirement
                </h4>
                <p className='text-xs text-gray-400'>
                  List specific information or materials you need from clients
                </p>
              </div>
              <button
                type='button'
                className='flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-semibold'
                onClick={() => push({ label: "", required: false })}
              >
                <Plus size={14} /> Add Requirement
              </button>
            </div>
            {values.requirements.specific &&
              values.requirements.specific.length > 0 &&
              values.requirements.specific.map((req, idx) => (
                <div
                  key={idx}
                  className='p-5 border border-gray-100 rounded-xl bg-white shadow-sm flex items-start gap-4'
                >
                  <div className='flex-1 space-y-3'>
                    <Field
                      name={`requirements.specific[${idx}].label`}
                      type='text'
                      placeholder='E.g. Brand Name'
                      className='w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-purple-500'
                    />
                    <ErrorMessage name={`requirements.specific[${idx}].label`}>
                      {(msg) => (
                        <div className='text-xs text-red-500'>{msg}</div>
                      )}
                    </ErrorMessage>
                    <label className='flex items-center gap-2 text-xs text-gray-500 cursor-pointer'>
                      <Field
                        type='checkbox'
                        name={`requirements.specific[${idx}].required`}
                        className='rounded border-gray-300 text-purple-600 focus:ring-0'
                      />
                      Required
                    </label>
                  </div>
                  <button
                    type='button'
                    className='text-gray-400 hover:text-red-500 pt-2'
                    onClick={() => remove(idx)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
          </div>
        )}
      </FieldArray>

      {/* File Upload Presets */}
      <div className='space-y-4'>
        <h4 className='text-sm font-bold text-gray-800'>File Uploads</h4>
        <div className='space-y-2'>
          {fileRequirements.map((file, i) => (
            <div
              key={file.label}
              className='flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors'
            >
              <div>
                <p className='text-sm font-bold text-gray-800'>{file.label}</p>
                <p className='text-xs text-gray-400'>{file.sub}</p>
              </div>
              <Field
                type='checkbox'
                name={`requirements.files[${i}]`}
                className='w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-0'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className='space-y-2'>
        <label className='text-sm font-semibold text-gray-700'>
          Additional Information
        </label>
        <p className='text-xs text-gray-400'>
          Any other important information clients should know
        </p>
        <Field
          as='textarea'
          name='requirements.additional'
          placeholder='Add additional requirements or notes here'
          className='w-full h-24 p-4 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none'
        />
      </div>
    </div>
  );
};

export default Requirements;
