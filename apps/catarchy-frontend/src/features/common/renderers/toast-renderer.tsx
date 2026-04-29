import type React from "react";
import { useEffect } from "react";
import { ToastItem } from "../components/toast";
import { useToastStore } from "../stores/toast";

const DEFAULT_DURATION = 3000;

function ToastEntry({
  id,
  message,
  duration,
  hasCloseButton,
}: {
  id: string;
  message: React.ReactNode;
  duration?: number;
  hasCloseButton?: boolean;
}) {
  const dismiss = useToastStore((s) => s.dismiss);

  useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(() => dismiss(id), duration ?? DEFAULT_DURATION);
    return () => clearTimeout(timer);
  }, [id, duration, dismiss]);

  return <ToastItem id={id} message={message} hasCloseButton={hasCloseButton} onDismiss={() => dismiss(id)} />;
}

export function ToastRenderer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none">
      <div className="z-50 p-4 max-w-(--layout-max-width) w-full flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastEntry key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
}
