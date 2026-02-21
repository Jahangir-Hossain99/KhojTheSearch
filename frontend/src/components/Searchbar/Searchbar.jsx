// src/components/Searchbar/Searchbar.jsx
import React, { useState } from 'react';
import FilterModal from './FilterModal';

const Searchbar = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleApplyFilters = () => {
    // Logic to handle filter submission goes here
    // e.g., trigger an API call with the selected filter values
    console.log("Filters applied!");
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col items-center mt-25 w-full px-4 sm:px-20">
      
      {/* Main Search Bar */}
      <div className="w-full flex items-center mb-4">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md transition-colors duration-200">
          Search
        </button>

        {/* Filter Button for Small Screens */}
        <button
          onClick={() => setShowFilters(true)}
          className="ml-2 sm:hidden bg-gray-200 text-gray-800 p-2 rounded-md"
        >
          Filters
        </button>
      </div>

      {/* Grid Filters for Medium and Large Screens */}
      <div className="hidden sm:grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Category</option>
          <option value="software-engineer">Software Engineer</option>
          <option value="data-analyst">Data Analyst</option>
          <option value="ux-designer">UX Designer</option>
          <option value="product-manager">Product Manager</option>
          <option value="marketing">Marketing</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Location</option>
          <option value="remote">Remote</option>
          <option value="new-york">New York</option>
          <option value="san-francisco">San Francisco</option>
          <option value="london">London</option>
          <option value="singapore">Singapore</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Job Level</option>
          <option value="entry-level">Entry Level</option>
          <option value="junior">Junior</option>
          <option value="mid-level">Mid Level</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Job Nature</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Experience</option>
          <option value="0-1">0-1 Years</option>
          <option value="1-3">1-3 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="5-7">5-7 Years</option>
          <option value="7+">7+ Years</option>
        </select>
      </div>

      {/* Conditionally Render the Filter Modal */}
      {showFilters && (
        <FilterModal onClose={() => setShowFilters(false)} onApply={handleApplyFilters} />
      )}
    </div>
  );
};

export default Searchbar;