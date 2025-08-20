"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    // Keep only the first param
    const firstKey = Array.from(searchParams.keys())[0];
    const firstValue = searchParams.get(firstKey);
    const newParams = new URLSearchParams();
    if (firstKey && firstValue) newParams.set(firstKey, firstValue);

    // Replace URL
    replace(`${pathname}?${newParams.toString()}`);
  };

  const hasFilter = Array.from(searchParams.keys())[1];

  return (
    <div className="filters mt-4">
      <div className="clearFilters h-8">
        {hasFilter && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-2xl ring-1 ring-primary-500 bg-primary-500 text-white px-4 py-2 text-xs hover:bg-white hover:text-primary-500 easy duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="flex justify-between flex-wrap gap-2 mt-4">
        <div className="flex gap-2 flex-wrap">
          <select
            className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
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
            className="text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl px-2 w-24 ring-1 ring-gray-300"
            onChange={handleFilterChange}
          />

          <input
            type="number"
            name="max"
            placeholder="max price"
            className="text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl px-2 w-24 ring-1 ring-gray-300"
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
            className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
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
          className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
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
