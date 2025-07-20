import React from "react";

const Filter = () => {
  return (
    <div className="mt-12 flex justify-between flex-wrap gap-2">
      <div className="flex gap-2 flex-wrap">
        <select
          className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
          name="type"
          id=""
        >
          <option>Type</option>
          <option value="digital">Digital</option>
          <option value="physical">Physical</option>
        </select>
        <input
          type="number"
          name="min"
          placeholder="min price"
          className="text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl px-2 w-24 ring-1 ring-gray-300"
        />

        <input
          type="number"
          name="max"
          placeholder="max price"
          className="text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl px-2 w-24 ring-1 ring-gray-300"
        />
        <select
          className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
          name="size"
          id=""
        >
          <option>Size</option>
          <option value="s">S</option>
          <option value="m">m</option>
          <option value="l">L</option>
        </select>

        <select
          className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
          name="color"
          id=""
        >
          <option>Color</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="black">Blue</option>
        </select>

        <select
          className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
          name="category"
          id=""
        >
          <option>Category</option>
          <option value="white">White</option>
        </select>

        <select
          className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
          name="all"
          id=""
        >
          <option>All filters</option>
          <option value="allfliters">All filters</option>
        </select>
      </div>

      <select
        className="py-2 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 rounded-2xl text-xs font-medium bg-gray-200"
        name=""
        id=""
      >
        <option>Sort by</option>
        <option value="">Price (low to high)</option>
        <option value="">Price (high to low)</option>
        <option value="">Newest</option>
        <option value="">Oldest</option>
      </select>
    </div>
  );
};

export default Filter;
