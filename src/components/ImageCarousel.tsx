import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className='mt-6'>
      <div className='overflow-hidden rounded-xl'>
        <img
          src={images[activeIndex]}
          alt='Gig preview'
          className='w-full h-[420px] object-cover'
        />
      </div>
      <ul className='flex justify-center gap-3 mt-4'>
        {images.map((img, index) => (
          <li key={index}>
            <img
              src={img}
              alt={`Preview ${index + 1}`}
              className={`w-16 h-16 rounded-md object-cover border cursor-pointer transition-all ${
                activeIndex === index
                  ? "border-primary ring-2 ring-primary"
                  : "hover:border-gray-400"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ImageCarousel;
