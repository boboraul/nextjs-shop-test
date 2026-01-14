"use client";

//For Global Constants
import { createContext, useContext } from "react";

const ConfigContext = createContext({
  WIX_LOGIN: true,
});

export const useConfig = () => useContext(ConfigContext);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigContext.Provider value={{ WIX_LOGIN: true }}>
      {children}
    </ConfigContext.Provider>
  );
}
