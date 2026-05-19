"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [ hasFilter, setHasFilter ] = useState(false);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    params.set(name, value);

    replace(`${pathname}?${params.toString()}`);
  };

  // console.log(searchParams.get('page'));

  const clearFilters = () => {
    // Keep only the first param
    const firstKey = Array.from(searchParams.keys())[0];
    const firstValue = searchParams.get(firstKey);
    const pageValue = searchParams.get("page");

    const newParams = new URLSearchParams();

    if (firstKey && firstValue) newParams.set(firstKey, firstValue);
    if (pageValue) newParams.set("page", pageValue);

    // Replace URL
    replace(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    const filterFound = Array.from(searchParams.keys()).some((p) => {
      if (p !== 'cat' && p !== 'page') {
        
      }
    });

    setHasFilter(filterFound);
  
  }, [searchParams]);

  return (
    <div className="filters mt-4">
      <div className="clearFilters h-8">
        {hasFilter && (
          <button
            type="button"
            onClick={clearFilters}
            className="py-2 px-4 rounded-2xl border border-slate-200 bg-gray-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="flex justify-between flex-wrap gap-2 mt-4">
        <div className="flex gap-2 flex-wrap">
          <select
            className="rounded-2xl border border-slate-200 bg-gray-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            name="type"
            id=""
            onChange={handleFilterChange}
          >
            <option value="reset">Type</option>
            <option value="digital">Digital</option>
            <option value="physical">Physical</option>
          </select>
          <input
            type="number"
            name="min"
            placeholder="min price"
            className="text-xs rounded-2xl w-24 border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            onChange={handleFilterChange}
          />

          <input
            type="number"
            name="max"
            placeholder="max price"
            className="text-xs rounded-2xl w-24 border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            onChange={handleFilterChange}
          />
          {/* <select
            className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
            onChange={handleFilterChange}
            name="size"
            id=""
          >
            <option>Size</option>
            <option value="s">S</option>
            <option value="m">m</option>
            <option value="l">L</option>
          </select> */}

          {/* <select
            className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
            onChange={handleFilterChange}
            name="color"
            id=""
          >
            <option>Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="black">Blue</option>
          </select> */}

          <select
            className="rounded-2xl border border-slate-200 bg-gray-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            name="cat"
            id=""
            onChange={handleFilterChange}
            disabled
          >
            <option>Category</option>
            <option value="white">White</option>
          </select>

          {/* <select
            className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
            name="all"
            id=""
            onChange={handleFilterChange}
          >
            <option>All filters</option>
            <option value="allfliters">All filters</option>
          </select> */}
        </div>

        <select
          className="py-2 px-4 rounded-2xl border border-slate-200 bg-gray-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          name="sort"
          id=""
          onChange={handleFilterChange}
        >
          <option value="reset">Sort by</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
