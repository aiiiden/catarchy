import React, { useEffect, useRef, useState } from "react";
import BorderEdge from "../assets/bottom-sheet-border-edge.svg?react";
import { Text } from "./text";

export type BottomSheetHeader = {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

type BottomSheetProps = {
  children?: React.ReactNode;
  onClose?: () => void;
  onDimClick?: () => void;
  header?: BottomSheetHeader;
  isClosing?: boolean;
};

const DURATION = 250;

export function BottomSheet({
  children,
  onClose,
  onDimClick,
  header,
  isClosing,
}: BottomSheetProps) {
  const [visible, setVisible] = useState(false);
  const closing = useRef(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(id);
  }, []);

  function startClose() {
    if (closing.current) return;
    closing.current = true;
    setVisible(false);
    setTimeout(() => onClose?.(), DURATION);
  }

  useEffect(() => {
    if (isClosing) startClose();
  }, [isClosing]);

  const isTitleString = typeof header?.title === "string";

  return (
    <>
      <div
        className="fixed inset-0 bg-gradient-dither-6 z-10 transition-opacity ease-in-out cursor-pointer"
        onClick={onDimClick ?? startClose}
        style={{
          transitionDuration: `${DURATION}ms`,
          transitionTimingFunction: "steps(8, end)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        className="fixed z-20 inset-x-0 bottom-0 mx-auto max-w-(--layout-max-width) transition-transform ease-in-out"
        style={{
          transitionDuration: `${DURATION}ms`,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transitionTimingFunction: "steps(8, end)",
        }}
      >
        <div className="w-full" onClick={startClose}>
          <div className="flex items-start w-full">
            <BorderEdge />
            <div className="h-2.5 bg-white border-t flex-1" />
            <BorderEdge className="transform scale-x-[-1]" />
          </div>
        </div>
        <div className="bg-white border-x">
          {header && (
            <header className="px-4 pb-2 border-b">
              <div className="flex items-center justify-between">
                <div className="size-4 relative">{header.left}</div>
                <div>
                  {isTitleString ? (
                    <Text as="h1" boxTrim className="font-bold">
                      {header.title}
                    </Text>
                  ) : (
                    header.title
                  )}
                </div>
                <div className="size-4 relative">{header.right}</div>
              </div>
            </header>
          )}
          <div className="max-h-[calc(100dvh-32px)] flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
