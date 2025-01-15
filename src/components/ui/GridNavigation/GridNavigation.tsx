"use client";

import {
  createContext,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type Tuple = [number, number];

export type GridNavigationProps = PropsWithChildren & {
  itemSize?: Tuple;
  numColumns?: number;
  numRows?: number;
  rowHeights?: number[];
  columnWidths?: number[];
  rowSpacings?: number[];
  columnSpacings?: number[];
  fixedLayout?: boolean;
  onInitFocus?: () => void;
  className?: string;
};

export type GridNavigationContextProps = {};

const GridNavigationContext = createContext<
  (GridNavigationProps & GridNavigationContextProps) | undefined
>(undefined);

export function useGridNavigationContext() {
  const context = useContext(GridNavigationContext);
  if (!context) {
    throw new Error(
      "useGridNavigationContext must be used within a GridNavigationContextProvider"
    );
  }
  return context;
}

export default function GridNavigation({
  onInitFocus,
  children,
  ...rest
}: GridNavigationProps) {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const onKeyEvent = useCallback(() => {}, []);

  useEffect(() => {
    const current = gridRef.current;
    current?.focus();
    current?.addEventListener("keydown", onKeyEvent);

    return () => {
      current?.removeEventListener("keydown", onKeyEvent);
    };
  }, [currentRow, currentColumn]);

  return (
    <GridNavigationContext.Provider value={{}}>
      <div id="gridNavComponent" className="" {...rest}>
        {children}
      </div>
    </GridNavigationContext.Provider>
  );
}

interface GridNavigationSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  divider?: boolean;
  focusFrom?: "right" | "left";
}
GridNavigation.Section = function GridNavigationSection({
  children,
  divider = false,
  focusFrom = "left",
  ...rest
}: GridNavigationSectionProps) {
  return (
    <section
      id="gridNavSection"
      className={` bg-black w-full ${divider && "border border-neutral-800"} ${
        rest?.className
      }`}
    >
      {children}
    </section>
  );
};

interface GridNavigationRowListProps {
  children: ReactNode;
  orientation?: "row" | "col";
  rowTitleComponentName?: string;
  rowItemSelected?: number[];
  rowItemFocused?: number[];
  jumpToRowItem?: number[];
  itemSelected?: number;
  itemFocused?: number;
  jumpToItem?: number;
  numColumns?: number;
  numRows?: number;
  itemSize?: Tuple;
  className?: string;
  id?: string;
}
GridNavigation.RowList = function GridNavigationRowList({
  orientation = "row",
  className,
  children,
}: GridNavigationRowListProps) {
  return (
    <div
      id="gridNavRowList"
      className={`shrink-0 grid grid-[${orientation}s]-6 row-span-1 ${className}`}
    >
      {children}
    </div>
  );
};

interface GridNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
GridNavigation.Item = function GridNavigationItem({
  children,
}: GridNavigationItemProps) {
  return (
    <div id="gridNavItem" className="grid grid-cols-6 row-span-1">
      {children}
    </div>
  );
};
