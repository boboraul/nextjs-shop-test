"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
// import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import CartModal from "./CartModal";
import WishlistModal from "./WishlistModal";
import { useWixClient } from "../hooks/useWixClient";
// import Cookies from "js-cookie";
import { useCartStore } from "../hooks/useCartStore";
import { useWishlistStore } from "../hooks/useWishlistStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      console.log('data', data);
      
      setLoggedIn(data.loggedIn);

      if (data.loggedIn) {
        setName(data.user.name);
      }
    };

    loadUser();
  }, [isLoggedIn]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setIsLoggedIn(data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleWishlist = () => {
    setIsWishListOpen((prev) => !prev);
  };

  const handleLogOut = async () => {
    try {
      setIsLoading(true);

      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setIsProfileOpen(false);
      setIsWishListOpen(false);

      setIsLoggedIn(false);

      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  const { counter } = useCartStore();

  const wishCounter = useWishlistStore((s) => s.items.length);

  // useEffect(() => {
  //   getCart(wixClient);
  // }, [wixClient, getCart]);

  return (
    <div className="flex item-center gap-4 xl:gap-6 relative">
      <div className="wishlist relative cursor-pointer">
        {/* <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      /> */}

        <svg
          onClick={handleWishlist}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>

        {wishCounter > 0 && isLoggedIn && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 text-[6px] leading-[16px] text-white flex justify-center items-center rounded-full">
            {wishCounter}
          </div>
        )}

        {isWishListOpen && <WishlistModal />}
      </div>

      <div className="relative flex items-end cursor-pointer">
        <svg
          onClick={handleProfile}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        {/* <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          onClick={handleProfile}
        /> */}
        {isProfileOpen && (
          <div className="absolute rounded-md bg-white right-[-30px] min-w-[150px] shadow-md p-3 top-10 text-sm z-20">
            <Link href="/" className="border-b py-2 mt-1 w-full">
              My Account
            </Link>
            <div
              className="cursor-pointer pt-2 mt-1 w-full"
              onClick={handleLogOut}
            >
              {isLoading ? "Logging Out" : "Logout"}
            </div>
          </div>
        )}
        {loggedIn && (
          <small className="flex items-center">
            Hello,
            <span className="text-primary-500 truncate max-w-[80px] inline-block ml-1">
              {name}
            </span>
            !
          </small>
        )}
      </div>

      <div className="relative cursor-pointer">
        <svg
          onClick={() => setIsCartOpen((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>

        {/* <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsCartOpen((prev) => !prev)}
        /> */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 text-[6px] leading-[16px] text-white flex justify-center items-center rounded-full">
          {counter}
        </div>
        {isCartOpen && <CartModal />}
      </div>
    </div>
  );
};

export default NavIcons;
