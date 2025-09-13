// src/components/Searchbar/FilterModal.jsx
import React from 'react';

const FilterModal = ({ onClose, onApply }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Filter Jobs</h2>
        <div className="flex flex-col space-y-4">
          {/* Job Category */}
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Category</option>
            <option value="software-engineer">Software Engineer</option>
            <option value="data-analyst">Data Analyst</option>
            <option value="ux-designer">UX Designer</option>
          </select>

          {/* Location */}
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Location</option>
            <option value="remote">Remote</option>
            <option value="new-york">New York</option>
          </select>

          {/* Job Level */}
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Job Level</option>
            <option value="entry-level">Entry Level</option>
            <option value="senior">Senior</option>
          </select>

          {/* Job Nature */}
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Job Nature</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>

          {/* Experience */}
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Experience</option>
            <option value="0-1">0-1 Years</option>
            <option value="3-5">3-5 Years</option>
          </select>

          <button
            onClick={onApply}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;