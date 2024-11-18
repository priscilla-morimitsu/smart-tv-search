"use client";

import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

export type MenuContextProps = {};

const MenuContext = createContext<(MenuProps & MenuContextProps) | undefined>(
  undefined
);

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
}

export type MenuProps = PropsWithChildren & {
  menuList: { icon?: ReactNode; name: string }[];
};

export default function Menu({ menuList }: MenuProps) {
  return (
    <MenuContext.Provider value={{ menuList }}>
      <ul
        id="menuItem"
        className="absolute top-0 left-0 z-50 h-screen group flex flex-col items-center group-hover:items-start justify-center text-lg font-medium bg-black border-r border-gray-800"
      >
        {menuList.map((menu) => (
          <Menu.Item key={menu.name} icon={menu.icon}>
            {menu.name}
          </Menu.Item>
        ))}
      </ul>
    </MenuContext.Provider>
  );
}

interface MenuItemProps {
  children: ReactNode;
  icon: ReactNode;
}

Menu.Item = function MenuItem({ children, icon }: MenuItemProps) {
  return (
    <li className="flex flex-row gap-8 items-center justify-start px-9 group-hover:pr-14 py-8 hover:bg-[#1f1f1f] w-full">
      {icon}
      <span className="hidden group-hover:block h-fit leading-none p-0 m-0">
        {children}
      </span>
    </li>
  );
};
