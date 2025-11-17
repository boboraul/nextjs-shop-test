"use client";

import { WixClientContext } from "../Context/wixContext";
import { useContext } from "react";
import { MyWixClient } from "../Context/wixContext";

export const useWixClient = (): MyWixClient => {
  const client = useContext(WixClientContext);
  if (!client) throw new Error("WixClientContext is not provided");
  return client;
};
