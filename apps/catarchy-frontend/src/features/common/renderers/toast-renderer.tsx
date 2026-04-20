import { useEffect } from "react";
import { useToastStore } from "../stores/toast";

const DEFAULT_DURATION = 3000;

function ToastEntry({ id, duration }: { id: string; message: string; variant?: string; duration?: number }) {
  const dismiss = useToastStore((s) => s.dismiss);

  useEffect(() => {
    const timer = setTimeout(() => dismiss(id), duration ?? DEFAULT_DURATION);
    return () => clearTimeout(timer);
  }, [id, duration, dismiss]);

  return null;
}

export function ToastRenderer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <>
      {toasts.map((toast) => (
        <ToastEntry key={toast.id} {...toast} />
      ))}
    </>
  );
}
