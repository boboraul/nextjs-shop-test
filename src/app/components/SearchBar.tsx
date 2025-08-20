"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    console.log(name);
    if (name) {
      console.log(name);
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      className="flex justify-content-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      action=""
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        name="name"
        className="flex-1 outline-none bg-gray-100"
      />
      <button className="cursor-pointer">
        {/* <Image src="/search.png" alt="" width={16} height={16} /> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
