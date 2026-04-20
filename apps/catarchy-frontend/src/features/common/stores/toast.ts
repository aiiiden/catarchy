import { create } from "zustand";

export type ToastVariant = "info" | "success" | "error" | "warning";

export type Toast = {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastStore = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => string;
  dismiss: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = crypto.randomUUID();
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    return id;
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
