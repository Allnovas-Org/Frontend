import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Briefcase, ArrowRight, SlidersHorizontal } from 'lucide-react';

const WorkHistoryEmpty: React.FC = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');
  
  // Custom dropdown states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Web Design');
  const [selectedStatus, setSelectedStatus] = useState('Completed');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const categoryOptions = ['Web Design', 'Prototype', 'Mobile App', 'Landing Page'];
  const statusOptions = ['Completed', 'Active', 'Pending', 'Cancelled'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMoreFilters(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 lg:p-8 lg:ml-8 flex-1">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 md:mt-12 lg:mt-16">Work History</h1>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 relative">
        {/* Search Input */}
        <div className="w-full sm:w-32 sm:flex-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by projects, clients or skills..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Project Category Dropdown */}
        <div className="relative w-full sm:w-48 lg:w-64" ref={categoryRef}>
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-500 bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {selectedCategory}
            <ChevronDown className="text-gray-400 w-5 h-5" />
          </button>
          {showCategoryDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-20">
              {categoryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedCategory(option);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedCategory === option
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="relative w-full sm:w-48 lg:w-64" ref={statusRef}>
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-500 bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {selectedStatus}
            <ChevronDown className="text-gray-400 w-5 h-5" />
          </button>
          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-20">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedStatus(option);
                    setShowStatusDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedStatus === option
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* More Filters Button */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50 flex items-center gap-2 justify-center"
          >
            <SlidersHorizontal className="w-5 h-5" />
            More Filters
          </button>

          {/* More Filters Dropdown */}
          {showMoreFilters && (
            <div className="absolute right-0 mt-2 w-full sm:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {/* Filter by Budget */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Filter by Budget</h3>
                <div className="space-y-2">
                  {['Under $1,000', '$1,000 - $6,000', '$6,000 - $10,000', 'Over $10,000'].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setSelectedBudget(selectedBudget === budget ? '' : budget)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedBudget === budget
                          ? 'bg-red-50 text-red-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h3>
                <div className="space-y-2">
                  {['Date', 'Budget', 'Rating'].map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSelectedSort(selectedSort === sort ? '' : sort)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedSort === sort
                          ? 'bg-red-50 text-red-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {sort}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Date Range</h3>
                <div className="space-y-2">
                  {['Last 30 days', 'Last 3 month', 'Last year', 'All time'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedDateRange(selectedDateRange === range ? '' : range)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedDateRange === range
                          ? 'bg-red-50 text-red-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center mt-16 sm:mt-20 lg:mt-32 px-4">
        {/* Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" strokeWidth={1.5} />
        </div>

        {/* Message */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-center">
          Oops! you don't have any work histories yet.
        </h2>
        <p className="text-gray-600 text-center max-w-md mb-8 text-sm sm:text-base">
          Your pending, active and completed work histories will be available here when<br className="hidden sm:block" />
          you start working with clients.
        </p>

        {/* CTA Button */}
        <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors">
          Browse openings
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WorkHistoryEmpty;