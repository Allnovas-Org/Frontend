import React from "react";
import Avatar from "./Avatar";
import { Seller } from "../types";

interface SellerHeaderProps {
  seller: Seller;
}

const SellerHeader = ({ seller }: SellerHeaderProps) => {
  return (
    <header className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Avatar src={seller.avatarUrl} alt={seller.name} />
        <div className='flex items-center gap-2'>
          <p className='font-medium text-gray-900'>{seller.name}</p>
          <p className='text-sm text-purple flex items-center gap-2'>
            <span
              className={`w-2 h-2 rounded-full ${
                seller.isAvailable ? "bg-purple" : "bg-gray-400"
              }`}
            />
            {seller.isAvailable ? "Available for hire" : "Unavailable"}
          </p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button
          aria-label='Add to favorites'
          className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100'
        >
          <span className='text-lg'>♡</span>
        </button>
        <span className='text-sm text-gray-500'>
          ({seller.recommendations} recommendations)
        </span>
        <button className='px-5 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition'>
          Hire now
        </button>
      </div>
    </header>
  );
};

export default SellerHeader;
