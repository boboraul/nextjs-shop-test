"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black py-6 text-white left-0 top-20 w-full flex flex-col items-center justify-center gap-8 z-10 text-xl">
          <Link href="/">Homepage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
