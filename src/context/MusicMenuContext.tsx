"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// type MenuOption = "CinemaDespek" | "DilokeRaqse" | "Hunermend" | "DilokeMin";

interface MenuContextProps {
  active: string;
  setActive: (key: string) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<string>("CinemaDespek");

  return (
    <MenuContext.Provider value={{ active, setActive }}>
      {children}
    </MenuContext.Provider>
  );
};
