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

  const [user, setUser] = useState<MeUser | null>(null);

  // 1 Afla user-ul logat din /api/auth/me
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        if (cancelled) return;

        if (data.loggedIn && data.user?.id) {
          setUser({ id: data.user.id, email: data.user.email });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Cand avem user.id, incarcam wishlist-ul pentru user-ul respectiv
  useEffect(() => {
    if (!user?.id) return;

    fetchWishlist(wixClient, user.id);
  }, [user?.id, wixClient, fetchWishlist]);

  return null;
};

export default WishlistInitializer;
