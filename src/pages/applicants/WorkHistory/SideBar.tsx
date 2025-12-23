import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const ProjectFilters: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedSort, setSelectedSort] = useState('Newest First');
  const [selectedDateRange, setSelectedDateRange] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const dropdowns = [
    {
      label: 'Project Categories',
      value: selectedCategory,
      setValue: setSelectedCategory,
      options: ['All Categories', 'Web Design', 'Prototype', 'Mobile App', 'Landing Page'],
    },
    {
      label: 'Budget Range',
      value: selectedBudget,
      setValue: setSelectedBudget,
      options: ['All Budgets', 'Under $1,000', '$1,000 - $6,000', '$6,000 - $10,000', 'Over $10,000'],
    },
    {
      label: 'Sort By',
      value: selectedSort,
      setValue: setSelectedSort,
      options: ['Newest First', 'Date', 'Budget', 'Rating'],
    },
    {
      label: 'Date Range',
      value: selectedDateRange,
      setValue: setSelectedDateRange,
      options: ['All', 'Last 30 days', 'Last 3 Months', 'Last year', 'All time'],
    },
    {
      label: 'Status',
      value: selectedStatus,
      setValue: setSelectedStatus,
      options: ['All', 'Completed', 'Active', 'Pending', 'Cancelled'],
    },
  ];

  return (
    <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-sm mt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
        <button className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
          Reset all
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Search Projects
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, clients or skills..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* Custom Dropdowns */}
      {dropdowns.map((dropdown, index) => (
        <div key={dropdown.label} className={index < dropdowns.length - 1 ? 'mb-6' : ''}>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {dropdown.label}
          </label>
          <div className="relative">
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === dropdown.label ? null : dropdown.label)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            >
              {dropdown.value}
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  openDropdown === dropdown.label ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {openDropdown === dropdown.label && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10 overflow-hidden">
                {dropdown.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      dropdown.setValue(option);
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectFilters;