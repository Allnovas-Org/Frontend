import React from "react";
import { Lightbulb } from "lucide-react";
import { TipItem } from "../../types";

interface TipsSidebarProps {
  title: string;
  tips: TipItem[];
}

const TipsSidebar: React.FC<TipsSidebarProps> = ({ title, tips }) => {
  return (
    <aside className='w-full max-w-full sm:max-w-md lg:w-80 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 h-fit shadow-sm'>
      <div className='flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6'>
        <div className='p-2 bg-light-purple text-gray-darker rounded-lg'>
          <Lightbulb size={20} />
        </div>
        <h3 className='font-bold text-gray-800'>{title}</h3>
      </div>
      <ul className='space-y-2 sm:space-y-2'>
        {tips.map((tip) => (
          <li key={tip.id} className='flex gap-3 text-sm text-gray-600 '>
            <span className='text-gray-400'>•</span>
            {tip.text}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TipsSidebar;
