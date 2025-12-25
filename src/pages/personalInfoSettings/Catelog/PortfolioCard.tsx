import React from "react";
import { PortfolioItem } from "../../../types";

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard = ({ item }: PortfolioCardProps) => {
  return (
    <article className='space-y-3'>
      <div className='rounded-xl overflow-hidden border border-gray-200'>
        <img
          src={item.image}
          alt={item.title}
          className='w-full h-56 object-cover hover:scale-105 transition'
        />
      </div>
      <h4 className='text-sm font-medium text-gray-900'>{item.title}</h4>
    </article>
  );
};

export default PortfolioCard;
