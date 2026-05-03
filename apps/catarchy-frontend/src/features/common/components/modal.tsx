import React, { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import styles from "./modal.module.css";
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
      className={styles.dialog}
    >
      <div className={styles.padding}>
        <Box rounded className={styles.wFull} tight={Boolean(header)}>
          {header && (
            <header className={styles.header}>
              <div className={styles.headerInner}>
                <div className={styles.headerIcon}>{header.left}</div>
                <Text as="h2" className="font-bold">
                  {header.title}
                </Text>
                <div className={styles.headerIcon}>{header.right}</div>
              </div>
            </header>
          )}
          {!header && children}
          {header && (
            <div className={styles.bodyWrapper}>
              <div className={styles.bodyInner}>{children}</div>
            </div>
          )}
        </Box>
      </div>
    </dialog>
  );
}
