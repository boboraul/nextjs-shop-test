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
      className="flex ic justify-content-between gap-4 bg-gray-100 p-3 rounded-md flex-1"
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
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
