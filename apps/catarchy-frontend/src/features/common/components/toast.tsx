import type React from "react";
import XIcon from "../assets/x-icon.svg?react";
import { Box } from "./box";
import { Text } from "./text";

type ToastProps = {
  id: string;
  message: React.ReactNode;
  onDismiss?: () => void;
};

export function ToastItem({ message, onDismiss }: ToastProps) {
  const isMessageString = typeof message === "string";

  return (
    <Box rounded containerClassName="bg-black text-white pointer-events-auto">
      <div className="flex items-start">
        <div className="pl-2 pr-1 py-1 flex-1">
          {isMessageString ? <Text>{message}</Text> : message}
        </div>
        <button className="p-2 shrink-0" onClick={onDismiss}>
          <XIcon />
        </button>
      </div>
    </Box>
  );
}
