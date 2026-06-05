import React, { useState } from "react";
import { Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative w-full'>
      <button
        onClick={() => setOpen(!open)}
        className='w-full rounded-lg border border-input px-4 py-2 text-left text-sm bg-white'
      >
        {label}
      </button>

      {open && (
        <div className='absolute z-10 mt-2 w-full rounded-lg border border-input bg-white shadow'>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className='flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-50'
            >
              <span>{option.label}</span>
              {value === option.value && (
                <Check size={16} className='text-green-600' />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
