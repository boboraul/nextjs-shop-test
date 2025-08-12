import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

const Navbar = () => {
  return (
    <div className="h-20 py-4 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative sticky top-0 z-[1020] bg-white shadow-md">
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
          <div className="text-2xl tracking-wide">e-Shop</div>
        </Link>
        <Menu />
      </div>

      {/* Bigger screens */}
      <div className="hidden md:flex items-center h-full jusitfy-between gap-8">
        {/* Left */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1">
            <Image
              className="inline-block rotate-10"
              src="/logo-new.svg"
              alt=""
              width={28}
              height={28}
            />
            <div className="text-2xl inline-block align-middle">e-Shop</div>
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
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
