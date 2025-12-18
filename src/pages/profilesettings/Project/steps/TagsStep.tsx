import React, { useRef } from "react";
import { FieldArray } from "formik";
import { X } from "lucide-react";

interface TagsStepProps {
  values: { tags: string[] };
  errors: { tags?: string };
  push: (tag: string) => void;
  remove: (index: number) => void;
}

const TagsStep = ({ values, errors, push, remove }: TagsStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className='mb-2 text-sm text-gray-700 font-semibold'>
        Add tags for your project
      </div>
      <div className='mb-4'>
        <label className='block text-xs font-medium mb-1'>
          Type in the tags and press enter to save
        </label>
        <div className='relative'>
          <div className='flex flex-wrap gap-2 absolute left-2 top-2 z-10'>
            {values.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className='border border-gray-400 rounded-full px-4 py-1 text-sm font-medium flex items-center gap-1 bg-white mb-2'
              >
                {tag}
                <button type='button' onClick={() => remove(idx)}>
                  <X className='w-4 h-4 text-gray-500' />
                </button>
              </span>
            ))}
          </div>
          <input
            ref={inputRef}
            type='text'
            className='border border-gray-300 rounded-lg px-3 py-2 text-sm w-full pl-2'
            style={{ paddingTop: values.tags.length ? 32 : undefined }}
            placeholder='Enter tag and press enter'
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                e.preventDefault();
                push(e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
        {errors.tags && typeof errors.tags === "string" && (
          <div className='text-red-500 text-xs mt-1'>{errors.tags}</div>
        )}
      </div>
    </div>
  );
};

export default TagsStep;
