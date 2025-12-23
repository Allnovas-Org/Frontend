import React, { useState } from "react";
import { CatalogueItem } from "../../../types";
import { Clock, Star, ShieldCheck, MoveUpRight, Heart } from "lucide-react";

const CatalogueCard: React.FC<{ item: CatalogueItem }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className='bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow min-w-[300px] flex-1'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className='relative h-48'>
        <img
          src={item.image}
          alt={item.title}
          className='w-full h-full object-cover'
        />
        {hovered && (
          <div className='absolute top-3 right-3 z-10'>
            <span className='w-8 h-8 flex items-center justify-center rounded-full bg-white shadow border border-gray-200'>
              <Heart className='w-5 h-5 text-red-400' />
            </span>
          </div>
        )}
        <div
          className={`absolute inset-0 bg-black bg-opacity-10 transition ${
            hovered ? "opacity-35" : "opacity-0"
          }`}
        ></div>
        <button
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition bg-black text-gray-lighter font-semibold text-sm gap-2 flex items-center px-8 py-2 rounded-lg shadow-lg ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: 2 }}
        >
          Explore
          <MoveUpRight className='w-4 h-4' />
        </button>
      </div>
      <div className='p-4'>
        <h3
          className={`font-bold text-gray-800 text-sm leading-tight mb-3 line-clamp-2 transition-colors ${
            hovered ? "text-red-500" : ""
          }`}
        >
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
        <div className='flex items-center justify-between border-t border-gray-light pt-3'>
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
