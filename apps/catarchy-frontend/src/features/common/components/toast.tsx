import type React from "react";
import XIcon from "../assets/x-icon.svg?react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import styles from "./toast.module.css";
import { Text } from "./text";

type ToastProps = {
  id: string;
  message: React.ReactNode;
  hasCloseButton?: boolean;
  onDismiss?: () => void;
};

export function ToastItem({
  message,
  hasCloseButton = true,
  onDismiss,
}: ToastProps) {
  const isMessageString = typeof message === "string";

  return (
    <Box rounded isDark containerClassName={styles.container}>
      <div className={styles.row}>
        <div
          className={cn(
            styles.message,
            hasCloseButton ? styles.messagePadded : styles.messageNoClose,
          )}
        >
          {isMessageString ? <Text>{message}</Text> : message}
        </div>
        {hasCloseButton && (
          <button className={styles.closeButton} onClick={onDismiss}>
            <XIcon />
          </button>
        )}
      </div>
    </Box>
  );
}
