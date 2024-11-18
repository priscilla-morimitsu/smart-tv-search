"use client";

import {
  createContext,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Tuple } from "../grid-navigation";

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

const KeyboardContext = createContext<
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

export default function Keyboard({ onSearch }: KeyboardProps) {
  const [inputValue, setInputValue] = useState("");
  const [itemSelected, setItemSelected] = useState("A");
  const [selector, setSelector] = useState<Tuple>([0, 0]);

  useEffect(() => onSearch(inputValue), [inputValue]);

  const onKeyPress = useCallback(
    (key: string) => {
      console.log("🚀 ~ Keyboard ~ key:", key);
      setItemSelected(key);
      if (key === "⌫ APAGAR") {
        setInputValue(inputValue.slice(0, -1));
      } else if (key === "⎵ ESPAÇO") {
        setInputValue(inputValue + " ");
      } else {
        setInputValue(inputValue + key);
      }
    },
    [inputValue, setItemSelected, setInputValue]
  );

  const onKeyEvent = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          const upPosition: Tuple = [Math.max(selector[0] - 1, 0), selector[1]];
          setItemSelected(keyboardLayout[upPosition[0]][upPosition[1]]);
          setSelector(upPosition);
          break;
        case "ArrowDown":
          const downPosition: Tuple = [
            Math.min(selector[0] + 1, 6),
            selector[1],
          ];
          setItemSelected(keyboardLayout[downPosition[0]][downPosition[1]]);
          setSelector(downPosition);
          break;
        case "ArrowLeft":
          const leftPosition: Tuple = [
            selector[0],
            Math.max(selector[1] - 1, 0),
          ];
          setItemSelected(keyboardLayout[leftPosition[0]][leftPosition[1]]);
          setSelector(leftPosition);
          break;
        case "ArrowRight":
          const rightPosition: Tuple = [
            selector[0],
            Math.min(selector[1] + 1, 5),
          ];
          setItemSelected(keyboardLayout[rightPosition[0]][rightPosition[1]]);
          setSelector(rightPosition);
          break;
        case "Enter":
          onKeyPress(itemSelected);
        default:
          break;
      }
    },
    [setSelector, selector, onKeyPress, setItemSelected]
  );

  return (
    <KeyboardContext.Provider value={{ itemSelected, selector, onSearch }}>
      <div id="keyboardComponent" className="w-full space-y-8">
        <Keyboard.Input value={inputValue} />

        <div
          className="grid grid-rows-7 w-full h-[350px] border border-[#ccc]"
          onKeyDown={onKeyEvent}
          tabIndex={0}
          autoFocus
        >
          {keyboardLayout.map((row, index) => (
            <Keyboard.Row key={index} row={row} onKeyPress={onKeyPress} />
          ))}
        </div>
      </div>
    </KeyboardContext.Provider>
  );
}

Keyboard.Row = function KeyboardRow({
  row,
  onKeyPress,
}: {
  row: string[];
  onKeyPress: (value: string) => void;
}) {
  const { itemSelected } = useKeyboardContext();
  return (
    <div id="keyboardRow" className="grid grid-cols-6 row-span-1">
      {row.map((key) => (
        <Keyboard.Key
          key={key}
          value={key}
          handleKeyPress={onKeyPress}
          className={
            itemSelected == key ? "bg-white text-black font-medium" : ""
          }
        />
      ))}
    </div>
  );
};

interface KeyboardKeyProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  handleKeyPress: (e: string) => void;
}
Keyboard.Key = function KeyboardKey({
  value,
  handleKeyPress,
  ...rest
}: KeyboardKeyProps) {
  const columns = value?.length > 1 ? "col-span-3" : "col-span-1";

  return (
    <div
      id="keyboradKey"
      onKeyDown={() => handleKeyPress(value)}
      className={`${columns} flex items-center justify-center border border-neutral-500 hover:bg-white hover:text-black text-xl lowercase ${rest?.className}`}
    >
      {value}
    </div>
  );
};

Keyboard.Input = function KeyboardInput({
  value = "Busca",
}: {
  value: string;
}) {
  return (
    <input
      id="keyboardInput"
      className="text-3xl font-semibold text-white bg-transparent placeholder:text-white capitalize"
      type="text"
      placeholder="Busca"
      value={value.toLowerCase()}
      readOnly
    />
  );
};
