"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = ({children}: {children: React.ReactNode}) => {
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
        <div className="fixed h-full pb-4 bg-primary-500 overflow-y-auto text-white text-right left-0 top-0 w-full z-10">
          
          <button className="cursor-pointer md:hidden border-white p-4 text-sm" onClick={() => setIsOpen(false)}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="menu-items w-full flex flex-col items-center justify-center text-lg">

            <div className="mobile-categories w-full border-b-2 pb-4 border-white text-center mb-4">
              {children}
            </div>

            <Link href="/"  onClick={() => setIsOpen(false)}>Deals</Link>
            <Link href="/"  onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/"  onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/"  onClick={() => setIsOpen(false)}>Logout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
