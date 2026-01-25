import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav
      className='flex items-center gap-2 text-sm md:text-base text-gray-dark mb-6 md:mb-8 flex-wrap'
      aria-label='Breadcrumb navigation'
    >
      {items.map((item, index) => (
        <div key={index} className='flex items-center gap-2'>
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className='text-primary hover:text-red-700 hover:underline transition-colors font-medium'
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </button>
          ) : (
            <span className='text-gray-darker font-medium'>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className='w-8 h-8 text-gray-dark-20' />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
