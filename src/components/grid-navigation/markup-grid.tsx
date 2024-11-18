"use client";

import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Tuple } from ".";

export type GridItemProps = {
  id: number;
  title?: string;
  urlImage?: string;
};

export type GridRowProps = {
  titleRow?: string;
  items?: GridItemProps[];
  orientation?: "row" | "col";
};

export type MarkupGridProps = {
  children?: ReactNode;
  itemSelected?: Tuple;
  itemFocused?: Tuple;
  itemUnfocused?: Tuple;
  jumpToItem?: Tuple;
  selector?: Tuple;
  divider?: boolean;
  hasFocus?: boolean;
  onInitFocus: () => void;
  itemSize: Tuple;
  content: GridRowProps[];
  className?: string;
};

export type MarkupGridContextProps = {};

const MarkupGridContext = createContext<
  (MarkupGridProps & MarkupGridContextProps) | undefined
>(undefined);

export function useMarkupGridContext() {
  const context = useContext(MarkupGridContext);
  if (!context) {
    throw new Error(
      "useMarkupGridContext must be used within a MarkupGridContextProvider"
    );
  }
  return context;
}

export default function MarkupGrid({
  children,
  onInitFocus,
  itemSize,
  itemFocused,
  itemUnfocused,
  jumpToItem,
  content,
  divider,
  hasFocus,
  ...rest
}: MarkupGridProps) {
  const [isFocused, setIsFocused] = useState(hasFocus);
  const [itemSelected, setItemSelected] = useState<Tuple>([0, 0]);
  const [selector, setSelector] = useState<Tuple>([0, 0]);

  useEffect(() => setIsFocused(true), [onInitFocus]);

  const onKeyPress = useCallback((position: Tuple) => {
    console.log("🚀 ~ MarkupGrid ~ key:", position);
  }, []);

  const onKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          break;
        case "ArrowDown":
          break;
        case "ArrowLeft":
          break;
        case "ArrowRight":
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
    <MarkupGridContext.Provider
      value={{
        onInitFocus,
        itemSelected,
        itemFocused,
        itemUnfocused,
        jumpToItem,
        itemSize,
        selector,
        content,
      }}
    >
      <div
        className={`grid grid-rows-[${itemSize?.[0]}] grid-cols-1 w-full gap-8`}
        //@ts-ignore error
        onKeyDown={onKeyEvent}
        tabIndex={0}
        autoFocus={isFocused}
      >
        {content?.map((row, index) => (
          <div key={index} className={`w-full flex flex-col gap-4`}>
            {row && <span>{row?.titleRow}</span>}
            <MarkupGrid.Row
              key={row?.toString()}
              items={row?.items ?? []}
              orientation="row"
            />
          </div>
        ))}
      </div>
    </MarkupGridContext.Provider>
  );
}

MarkupGrid.Row = function MarkupGridRow({
  items,
  orientation = "row",
}: GridRowProps) {
  const { itemSelected, itemSize } = useMarkupGridContext();

  const hasFocus = false;
  return (
    <div
      id="markupGridRow"
      className={` w-full flex gap-4 overflow-x-hidden focus:outline-none`}
    >
      {items?.map((item) => (
        <MarkupGrid.Item
          key={item.id}
          item={item}
          hasFocus={hasFocus}
          handleKeyPress={() => console.log()}
        />
      ))}
    </div>
  );
};

interface MarkupGridItemProps extends HTMLAttributes<HTMLButtonElement> {
  item: GridItemProps;
  hasFocus: boolean;
  handleKeyPress: (item: GridItemProps) => void;
}

MarkupGrid.Item = function MarkupGridItem({
  item,
  hasFocus,
  handleKeyPress,
  children,
  ...rest
}: MarkupGridItemProps) {
  return (
    <div
      autoFocus={hasFocus}
      id="keyboradKey"
      onKeyDown={() => handleKeyPress(item)}
      className={`${
        hasFocus ? "ring-2 ring-white" : ""
      } min-w-32 h-full shrink-0 col-span-1`}
    >
      <img
        src={item?.urlImage}
        alt={item?.title}
        onClick={() => console.log("item?.title")}
        className={`shrink-0 h-48`}
      />
    </div>
  );
};
