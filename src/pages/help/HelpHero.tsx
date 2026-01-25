import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";

interface HelpHeroProps {
  onSearch: (query: string) => void;
}

const HelpHero: React.FC<HelpHeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch(value);
    },
    [onSearch],
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(searchQuery);
    },
    [onSearch, searchQuery],
  );

  return (
    <section className='w-full py-20 md:py-20 lg:py-32 px-4 md:px-6 bg-white'>
      <div className='max-w-4xl mx-auto text-center space-y-4 md:space-y-6'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900'>
          How can we help you?
        </h1>
        <p className='text-sm md:text-base text-gray-600'>
          We have all the help you might need
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className='flex items-center gap-2 md:gap-3 border border-input rounded-full px-4 md:px-5 py-2.5 md:py-3 max-w-md mx-auto bg-white hover:border-input transition-colors'
        >
          <input
            type='text'
            className='flex-1 outline-none text-sm md:text-base bg-transparent placeholder-gray-dark-20 text-gray-darker'
            placeholder='Search '
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label='Search help'
          />
          <button
            type='submit'
            className='flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary hover:bg-red-700 text-white transition-colors shrink-0'
            aria-label='Search'
          >
            <Search className='w-4 h-4 md:w-5 md:h-5' />
          </button>
        </form>
      </div>
    </section>
  );
};

export default HelpHero;
