"use client";
import React from "react";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const FilterBar = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, categories, sortOrder, setSortOrder }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-[#D8C2A7]/30 flex flex-col md:flex-row gap-4 justify-between items-center mb-8 sticky top-4 z-10 backdrop-blur-md bg-white/90">
      
      {/* Search */}
      <div className="relative w-full md:w-1/3">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A2B4C0]" />
        <input
          type="text"
          placeholder="بحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#F3EEE8] border border-transparent focus:border-[#101F30] rounded-lg outline-none text-[#101F30] transition-all"
        />
      </div>

      <div className="flex w-full md:w-auto gap-3">
        {/* Category Filter */}
        <div className="relative flex-1 md:flex-none">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#101F30]">
             <FaFilter />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-48 pl-10 pr-8 py-3 bg-[#F3EEE8] border border-transparent focus:border-[#101F30] rounded-lg outline-none text-[#101F30] appearance-none cursor-pointer font-medium"
          >
            <option value="">جميع الفئات</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <button
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 px-4 py-3 bg-[#101F30] text-[#F3EEE8] rounded-lg hover:bg-[#101F30]/90 transition-all font-medium whitespace-nowrap"
        >
          <FaSortAmountDown className={sortOrder === 'asc' ? "transform rotate-180 transition-transform" : "transition-transform"} />
          {sortOrder === 'asc' ? 'الأقل سعراً' : 'الأعلى سعراً'}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;