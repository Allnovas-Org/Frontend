import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  className = "",
  id,
  disabled = false,
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      htmlFor={id}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        id={id}
        disabled={disabled}
        className='accent-primary w-4 h-4 rounded border border-primary outline-primary focus:ring-2 focus:ring-primary transition-colors duration-200'
      />
      {label && <span className='text-gray-700 text-sm'>{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
