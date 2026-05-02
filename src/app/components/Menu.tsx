"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 p-2 md:hidden">
    
      <Image
        src="/menu.png"
        alt=""
        width={24}
        height={24}
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className="fixed h-full bg-primary-500 p-2 text-white text-right left-0 top-0 w-full z-10">
          <button className="cursor-pointer md:hidden border-white p-4 text-sm" onClick={() => setIsOpen(false)}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </button>

          <div className="menu-items flex mt-4 flex-col items-center justify-center gap-4 text-lg">
            <Link href="/">Home</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Logout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
