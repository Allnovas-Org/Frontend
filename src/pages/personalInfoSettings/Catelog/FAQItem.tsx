import React, { useState } from "react";
import type { FAQ } from "../../../types";

interface FAQItemProps {
  faq: FAQ;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='border border-gray-200 rounded-lg'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full text-left px-5 py-4 font-medium flex justify-between items-center'
      >
        {faq.question}
        <span className='text-xl'>{open ? "–" : "+"}</span>
      </button>
      {open && (
        <div className='px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-200'>
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;
