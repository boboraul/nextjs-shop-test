"use client";

import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
// import dynamic from "next/dynamic";

// const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
  return (
    <div className="h-15 py-3 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 3xl:px-[300px] relative sticky top-0 z-[1020] bg-white">
      {/* Mobile */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/" className="flex items-center gap-1">
          <Image
            className="inline-block rotate-10"
            src="/logo-new.svg"
            alt=""
            width={28}
            height={28}
          />
          <div className="text-2xl tracking-wide whitespace-nowrap">e-Shop</div>
        </Link>
        <Menu />
      </div>

      {/* Bigger screens */}
      <div className="hidden md:flex items-center h-full jusitfy-between gap-8">
        {/* Left */}
        <div className="w-1/7 xl:w-1/2 flex items-center flex-nowrap gap-12">
          <Link href="/" className="flex items-center gap-1">
            <Image
              className="inline-block rotate-10"
              src="/logo-new.svg"
              alt=""
              width={28}
              height={28}
            />
            <div className="text-xl inline-block whitespace-nowrap pr-5">
              e-Shop
            </div>
          </Link>
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/">Homepage</Link>
            <Link href="/">Shop</Link>
            <Link href="/">Deals</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/* Right */}
        <div className="w-full xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
