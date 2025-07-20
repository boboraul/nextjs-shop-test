"use client";

import { WixClientContext } from "../Context/wixContext";
import { useContext } from "react";

export const useWixClient = () => {
  return useContext(WixClientContext);
};
