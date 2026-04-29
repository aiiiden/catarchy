import type React from "react";
import { useToastStore } from "../stores/toast";

type ToastOptions = {
  id?: string;
  duration?: number;
  hasCloseButton?: boolean;
};

export function useToast() {
  const push = useToastStore((s) => s.push);
  const dismiss = useToastStore((s) => s.dismiss);

  return {
    push: (message: React.ReactNode, options?: ToastOptions) => push({ message, ...options }),
    dismiss,
  };
}
