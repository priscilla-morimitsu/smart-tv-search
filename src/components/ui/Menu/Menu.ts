import { createContext, PropsWithChildren, ReactNode, useContext } from "react";

export type MenuContextProps = {};

export const MenuContext = createContext<
  | (PropsWithChildren & {
      menuList: { icon?: ReactNode; name: string }[];
    } & MenuContextProps)
  | undefined
>(undefined);

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
}
