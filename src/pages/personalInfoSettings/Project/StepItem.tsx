import React, { FC } from "react";

interface StepItemProps {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepItem: FC<StepItemProps> = ({ label, isActive, isCompleted }) => {
  return (
    <div className='flex flex-col items-center w-full'>
      <span
        className={`mb-2 text-sm text-left w-full ${
          isActive ? "text-primary font-medium" : "text-gray-500"
        }`}
      >
        {label}
      </span>
      <div className='flex items-center w-full'>
        <div
          className={`flex items-center justify-center w-3 h-3 rounded-full text-xs font-semibold
            ${
              isCompleted
                ? "bg-primary text-white"
                : isActive
                ? "border-2 border-primary text-primary"
                : "border border-gray-300 text-gray-400"
            }`}
        ></div>
        <div
          className={`flex-1 h-px mx-2
            ${isCompleted ? "bg-primary" : "bg-gray-300"}`}
        />
      </div>
    </div>
  );
};

export default StepItem;
