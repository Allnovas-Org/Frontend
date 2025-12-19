import React from "react";
import { CatalogueItem } from "../types";
import { Clock, Star, ShieldCheck } from "lucide-react";

const CatalogueCard: React.FC<{ item: CatalogueItem }> = ({ item }) => {
  return (
    <div className='bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow min-w-[300px] flex-1'>
      <div className='relative h-48'>
        <img
          src={item.image}
          alt={item.title}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='p-4'>
        <h3 className='font-bold text-gray-800 text-sm leading-tight mb-3 line-clamp-2'>
          {item.title}
        </h3>
        <div className='flex justify-between items-center text-xs text-gray-500 mb-4'>
          <div className='flex items-center gap-1'>
            <Clock size={14} />
            <span>{item.deliveryTime} delivery</span>
          </div>
          <div>
            From <span className='font-bold text-gray-900'>${item.price}</span>
          </div>
        </div>
        <div className='flex items-center justify-between border-t pt-3'>
          <div className='flex items-center gap-2'>
            <img
              src={item.author.avatar}
              alt=''
              className='w-8 h-8 rounded-full object-cover'
            />
            <div>
              <p className='text-xs font-semibold text-gray-800'>
                {item.author.name}
              </p>
              {item.author.isTopRated && (
                <div className='flex items-center gap-1 text-[10px] text-blue-500'>
                  <ShieldCheck size={10} />
                  <span>Top Rated</span>
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center gap-1 text-xs'>
            <Star size={12} className='fill-green-500 text-green-500' />
            <span className='font-bold text-gray-700'>
              {item.author.rating}
            </span>
            <span className='text-gray-400'>({item.author.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogueCard;
