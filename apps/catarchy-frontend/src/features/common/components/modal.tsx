import React, { useEffect, useRef } from "react";
import { Box } from "./box";
import { Text } from "./text";

export type ModalHeader = {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

type ModalProps = {
  children?: React.ReactNode;
  onClose?: () => void;
  header?: ModalHeader;
};

export function Modal({ children, onClose, header }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={handleClick}
      className="outline-none border-none backdrop:bg-transparent backdrop:bg-gradient-dither-3 bg-transparent w-(--layout-max-width) left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
    >
      <div className="p-4">
        <Box rounded className="w-full" tight={Boolean(header)}>
          {header && (
            <header className="border-b pl-px pt-px pr-px">
              <div className="flex justify-between items-center px-2 pb-2 pt-1.5 bg-white">
                <div className="size-8 aspect-square">{header.left}</div>
                <Text as="h2" className="font-bold">
                  {header.title}
                </Text>
                <div className="size-8 aspect-square">{header.right}</div>
              </div>
            </header>
          )}
          {!header && children}
          {header && (
            <div className="px-px pb-px">
              <div className="bg-white">{children}</div>
            </div>
          )}
        </Box>
      </div>
    </dialog>
  );
}
