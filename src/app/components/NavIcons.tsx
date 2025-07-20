"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CartModal from "./CartModal";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = false;
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex item-center gap-4 xl:gap-6 relative">
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="relative cursor-pointer">
        <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          onClick={handleProfile}
        />
        {isProfileOpen && (
          <div className="absolute rounded-md bg-white right-0 shadow-md p-2 top-6 text-sm z-20">
            <Link href="/">Profile</Link>
            <div className="mt-2 cursor-pointer">Logout</div>
          </div>
        )}
      </div>
      <div className="relative cursor-pointer">
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 text-xs text-white flex justify-center align-center rounded-full">
          2
        </div>
        {isCartOpen && <CartModal />}
      </div>
    </div>
  );
};

export default NavIcons;
