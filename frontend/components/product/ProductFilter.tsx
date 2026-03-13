'use client';

import { useState } from 'react';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilter({ onFilterChange }: FilterProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'Card Games',
    'Expansions',
    'Party Games',
    'Strategy Games',
    'Family Games',
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
  ];

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    applyFilters({ categories: updated });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    applyFilters({ priceRange: values });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    applyFilters({ sortBy: value });
  };

  const applyFilters = (updates: any) => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      sortBy,
      ...updates,
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSortBy('featured');
    onFilterChange({
      categories: [],
      priceRange: [0, 1000],
      sortBy: 'featured',
    });
  };

  return (
    <div className="space-y-6">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium">Filters</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Panel */}
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Sort By */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Sort By</h3>
          </div>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-lg">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-lg">Price Range</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategories.length > 0 || priceRange[1] < 1000) && (
          <button
            onClick={clearFilters}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        )}

        {/* Active Filters Count */}
        {selectedCategories.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">{selectedCategories.length}</span> filter(s) active
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
