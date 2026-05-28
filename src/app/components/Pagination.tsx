"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
  totalPages,
}: {
  currentPage: number;
  totalPages: number,
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

  return (
    <div className="pagination mt-2 flex content-center w-full">
      {hasPrev && (
        <button
          onClick={() => createPageUrl(currentPage - 1)}
          // disabled={!hasPrev}
          className="bg-primary-500 text-white py-1 text-sm w-18 cursor-pointer"
        >
          &lsaquo; Previous
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`${currentPage === (i + 1) ? 'bg-primary-500 text-white' : 'text-primary-500 bg-white'} border border-primary-500 mx-[2px] py-1 text-sm w-6 cursor-pointer`}
          onClick={() => createPageUrl(i + 1)}
          >
          {i + 1}
        </button>
      ))}

      {/* {currentPage && (
        <button className="bg-primary-500 mx-auto text-white py-1 text-sm w-8 cursor-pointer">
          {currentPage}
        </button>
      )} */}
      
      {hasNext && (
        <button
          onClick={() => createPageUrl(currentPage + 1)}
          className="bg-primary-500 text-white py-1 text-sm w-18 cursor-pointer"
        >
          Next &rsaquo;
        </button>
      )}
    </div>
  );
};



export default Pagination;
