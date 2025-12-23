import React from "react";
import { Field } from "formik";
import { CloudUpload } from "lucide-react";

interface ImagesStepProps {
  values: {
    images: Array<{
      title: string;
      file?: File | null;
    }>;
  };
  errors: {
    images?: Array<{
      title?: string;
      file?: string;
    }>;
  };
  uploading: boolean[];
  uploadProgress: number[];
  handleFileUpload: (
    file: File,
    idx: number,
    setFieldValue: (field: string, value: unknown) => void
  ) => void;
  handleCancelUpload: (
    idx: number,
    setFieldValue: (field: string, value: unknown) => void
  ) => void;
  setFieldValue: (field: string, value: unknown) => void;
}

const ImagesStep = ({
  values,
  errors,
  uploading,
  uploadProgress,
  handleFileUpload,
  handleCancelUpload,
  setFieldValue,
}: ImagesStepProps) => (
  <div>
    {[0, 1].map((idx) => (
      <div key={idx} className='mb-6'>
        <label className='block text-sm font-medium mb-1'>Image Title</label>
        <Field
          name={`images[${idx}].title`}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2'
        />
        <div className='border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center p-8 mb-2 relative'>
          {!values.images[idx].file && !uploading[idx] && (
            <>
              <CloudUpload className='w-8 h-8 text-gray-400 mb-2' />
              <p className='text-gray-500 mb-2 text-xs'>
                Drag & drop or click <br /> to choose file(s)
              </p>
              <input
                type='file'
                accept='image/png,image/jpeg,image/svg+xml'
                className='absolute inset-0 opacity-0 cursor-pointer'
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0], idx, setFieldValue);
                  }
                }}
              />
            </>
          )}
          {uploading[idx] && (
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='relative mb-2'>
                <svg
                  className='animate-spin h-8 w-8 text-primary'
                  viewBox='0 0 50 50'
                >
                  <circle
                    className='opacity-25'
                    cx='25'
                    cy='25'
                    r='20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <circle
                    className='text-primary'
                    cx='25'
                    cy='25'
                    r='20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='4'
                    strokeDasharray={`${uploadProgress[idx]} 100`}
                  />
                </svg>
                <span className='absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-primary'>
                  {uploadProgress[idx]}%
                </span>
              </div>
              <div className='text-gray-500 mb-2'>Uploading Document...</div>
              <button
                type='button'
                className='bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-300 transition'
                onClick={() => handleCancelUpload(idx, setFieldValue)}
              >
                Cancel
              </button>
            </div>
          )}
          {values.images[idx].file && !uploading[idx] && (
            <div className='flex flex-col items-center w-full'>
              <div className='text-green-600 mb-2'>File uploaded</div>
              <button
                type='button'
                className='bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-300 transition'
                onClick={() => handleCancelUpload(idx, setFieldValue)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
        <div className='flex justify-between text-xs text-gray-500'>
          <span>Supported formats: jpg, png, svg.</span>
          <span>Max: 20MB</span>
        </div>
      </div>
    ))}
  </div>
);

export default ImagesStep;
