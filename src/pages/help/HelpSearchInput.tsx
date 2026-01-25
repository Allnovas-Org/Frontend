import React, { useState, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";

interface HelpSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const HelpSearch: React.FC<HelpSearchProps> = ({
  onSearch,
  placeholder = "Search help...",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        onSearch(value);
      }, 300);

      setTimeoutId(newTimeoutId);
    },
    [onSearch, timeoutId],
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    onSearch("");
  }, [onSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchQuery);
      }}
      className='flex items-center gap-2 md:gap-3 border border-input rounded-full px-4 md:px-5 py-2 md:py-2.5 bg-white hover:border-gray-400 transition-colors'
    >
      <input
        type='text'
        className='flex-1 outline-none text-sm md:text-base bg-transparent placeholder-gray-dark-20 text-gray-darker min-w-0'
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        aria-label='Search help articles'
      />
      {searchQuery && (
        <button
          type='button'
          onClick={handleClear}
          className='flex items-center justify-center text-input hover:text-gray-dark transition-colors shrink-0'
          aria-label='Clear search'
        >
          <X className='w-4 h-4' />
        </button>
      )}
      <button
        type='submit'
        className='flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary hover:bg-red-700 text-white transition-colors shrink-0'
        aria-label='Search'
      >
        <Search className='w-4 h-4 md:w-5 md:h-5' />
      </button>
    </form>
  );
};

export default HelpSearch;
