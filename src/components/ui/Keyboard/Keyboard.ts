"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { Tuple } from "../GridNavigation/GridNavigation";

export type KeyboardProps = PropsWithChildren & {
  onSearch: (title: string) => void;
};

export type KeyboardContextProps = {
  itemSelected: string;
  selector: Tuple;
};

export const keyboardLayout = [
  ["A", "B", "C", "D", "E", "F"],
  ["G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X"],
  ["Y", "Z", "0", "1", "2", "3"],
  ["4", "5", "6", "7", "8", "9"],
  ["⎵ ESPAÇO", "⌫ APAGAR"],
];

export const KeyboardContext = createContext<
  (KeyboardProps & KeyboardContextProps) | undefined
>(undefined);

export function useKeyboardContext() {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error(
      "useKeyboardContext must be used within a KeyboardContextProvider"
    );
  }
  return context;
}
