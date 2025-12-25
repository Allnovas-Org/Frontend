import React, { useRef } from "react";
import CatalogueCard from "./CatalogueCard";
import { CatalogueItem } from "../../../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MOCK_DATA: CatalogueItem[] = Array(4).fill({
  id: "1",
  image: "/images/applicants/cat1.png",
  title: "Website Landing Pages | UI/UX Designs in Figma | Framer",
  deliveryTime: "3 days",
  price: 100,
  author: {
    name: "Omobolaji S.",
    avatar: "/images/applicants/avatar2.png",
    rating: 4.9,
    reviewsCount: 324,
    isTopRated: true,
  },
});

const OtherCatalogues: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className='max-w-6xl mx-auto py-12 px-6 font-sans'>
      <h2 className='text-xl font-bold text-gray-800 mb-8'>
        Other Catalogues From Ajayi
      </h2>
      <div className='relative group mb-20'>
        <div
          className='flex gap-6 overflow-x-hidden scrollbar-hide pb-4'
          ref={carouselRef}
        >
          {MOCK_DATA.map((item, idx) => (
            <CatalogueCard key={idx} item={item} />
          ))}
        </div>
        <button
          className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 z-10'
          onClick={handleScrollLeft}
        >
          <ChevronLeft size={20} className='text-gray-600' />
        </button>
        <button
          className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 z-10'
          onClick={handleScrollRight}
        >
          <ChevronRight size={20} className='text-gray-600' />
        </button>
      </div>
      <div className='flex flex-col items-center border-t border-gray-100 pt-10 relative'>
        <div className='absolute left-1/2 -translate-x-1/2 -top-6 z-10'>
          <div className='w-12 h-12 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow'>
            SD
          </div>
        </div>
        <div className='mb-4' />
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>Ajayi Samuel</h3>
        <div className='flex gap-4'>
          <button className='px-8 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-colors'>
            Hire now
          </button>
          <button className='px-8 py-2.5 border border-red-400 text-red-400 hover:bg-red-50 rounded-full font-semibold transition-colors'>
            Recommend
          </button>
        </div>
      </div>
    </section>
  );
};

export default OtherCatalogues;
