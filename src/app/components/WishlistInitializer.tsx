"use client";

import { useEffect } from "react";
import { useWishlistStore } from "../hooks/useWishlistStore";
import { useWixClient } from "../hooks/useWixClient";

const WishlistInitializer = () => {
  const wixClient = useWixClient();
  const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);

  useEffect(() => {
    if (!wixClient) return;

    const init = async () => {
      try {
        const { member } = await wixClient.members.getCurrentMember();
        if (member?._id) {
          fetchWishlist(member._id);
        }
      } catch {
        // user nelogat -> nu facem nimic
      }
    };

    init();
  }, [wixClient, fetchWishlist]);

  return null;
};

export default WishlistInitializer;
