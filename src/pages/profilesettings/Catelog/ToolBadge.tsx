import React from "react";

interface ToolBadgeProps {
  label: string;
}

const ToolBadge = ({ label }: ToolBadgeProps) => {
  return (
    <span className='px-4 py-1.5 text-sm border border-gray-200 rounded-full text-gray-700'>
      {label}
    </span>
  );
};

export default ToolBadge;
