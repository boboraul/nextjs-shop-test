"use client";

import { useEffect, useState } from "react";
import { useWixClient } from "../hooks/useWixClient";
import { useWishlistStore } from "../hooks/useWishlistStore";

type MeUser = {
  id: string;
  email?: string;
};

const WishlistInitializer = () => {
  const wixClient = useWixClient();
  const { fetchWishlist } = useWishlistStore();

  const setUserId = useWishlistStore((s) => s.setUserId); // NEW: luam setterul din store

  const [user, setUser] = useState<MeUser | null>(null);

  // Afla user-ul logat din /api/auth/me
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          setUser(null);
          setUserId(null); // NEW: daca nu e logat, resetam userId global

          return;
        }

        const data = await res.json();
        if (cancelled) return;

        if (data.loggedIn && data.user?.id) {
          setUser({ id: data.user.id, email: data.user.email });
          setUserId(data.user.id); // NEW: salvam userId global pentru toate inimioarele
        } else {
          setUser(null);
          setUserId(null); // NEW
        }
      } catch {
        setUser(null);
        setUserId(null); // NEW
      }
    };

    init();

    const onAuthChanged = () => init(); // Facem refetch la user
    window.addEventListener("auth:changed", onAuthChanged);

    return () => {
      cancelled = true;
      window.removeEventListener("auth:changed", onAuthChanged);
    };
  }, [setUserId]); // NEW: dep

  // Cand avem user.id, incarcam wishlist-ul pentru user-ul respectiv
  // user.id este data.user.id returnat de endpoint-ul /api/auth/me
  useEffect(() => {
    if (!user?.id) return;

    fetchWishlist(wixClient, user.id);
  }, [user?.id, wixClient, fetchWishlist]);

  return null;
};

export default WishlistInitializer;
