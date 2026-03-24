"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNr: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNr.toString());

    replace(`${pathname}?${params}`);
  };

  console.log(currentPage);

  return (
    <div className="pagination mt-2 flex w-full">
      {hasPrev && (
        <button
          onClick={() => createPageUrl(currentPage - 1)}
          // disabled={!hasPrev}
          className="bg-primary-500 text-white py-1 mr-auto text-sm w-24 cursor-pointer"
        >
          &lsaquo; Previous
        </button>
      )}
      
        <button
         
          className="bg-primary-500 mx-auto text-white py-1 text-sm w-8 cursor-pointer"
        >
          {currentPage}
        </button>
      
      {hasNext && (
        <button
          onClick={() => createPageUrl(currentPage + 1)}
          className="bg-primary-500 ml-auto text-white py-1 text-sm w-24 cursor-pointer"
        >
          Next &rsaquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;
