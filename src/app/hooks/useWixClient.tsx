"use client";

import { WixClientContext, MyWixClient } from "../Context/wixContext";
import { useContext } from "react";

export const useWixClient = (): MyWixClient => {
  const client = useContext(WixClientContext);
  if (!client) throw new Error("WixClientContext is not provided");
  return client;
};
