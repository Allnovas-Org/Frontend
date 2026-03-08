import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      {/* Icon */}
      {icon && (
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
          {icon}
        </div>
      )}

      {/* Title */}
      <h2 className='mb-2 text-lg font-semibold text-gray-800'>{title}</h2>

      {/* Description */}
      {description && (
        <p className='mb-6 max-w-md text-sm text-gray-500'>{description}</p>
      )}

      {/* Action */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className='flex items-center gap-2 rounded-md bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600'
        >
          <span className='text-lg leading-none'>+</span>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
