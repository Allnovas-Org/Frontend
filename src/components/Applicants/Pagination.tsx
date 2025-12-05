import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../assets/applicants/customIcons";

export interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onPageChange,
}) => {
  const getPages = () => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current > 4) pages.push(1, "...");
      for (
        let i = Math.max(2, current - 2);
        i <= Math.min(total - 1, current + 2);
        i++
      ) {
        pages.push(i);
      }
      if (current < total - 3) pages.push("...", total);
      else if (current < total - 1) pages.push(total);
    }
    return pages;
  };

  const pages = getPages();
  return (
    <div className='flex justify-center items-center gap-2 mb-8'>
      <button
        className='px-2 py-1 text-heading font-bold bg-transparent flex items-center'
        onClick={() => onPageChange(current > 1 ? current - 1 : 1)}
        disabled={current === 1}
        aria-label='Previous page'
      >
        <ChevronLeftIcon className='w-5 h-5' color='#0F0F0F' />
      </button>
      {pages.map((num, idx) =>
        num === "..." ? (
          <span
            key={"ellipsis-" + idx}
            className='w-8 h-8 flex items-center justify-center text-gray-400'
          >
            ...
          </span>
        ) : (
          <button
            key={num}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold transition-all border-2 ${
              num === current
                ? "border border-input text-heading bg-transparent"
                : "border-transparent text-heading bg-transparent"
            }`}
            onClick={() => onPageChange(num as number)}
          >
            {num}
          </button>
        )
      )}
      <button
        className='px-2 py-1 text-heading font-bold bg-transparent flex items-center'
        onClick={() => onPageChange(current < total ? current + 1 : total)}
        disabled={current === total}
        aria-label='Next page'
      >
        <ChevronRightIcon className='w-5 h-5' color='#0F0F0F' />
      </button>
    </div>
  );
};

export default Pagination;
