import type React from "react";
import { useEffect } from "react";
import { ToastItem } from "../components/toast";
import { useToastStore } from "../stores/toast";
import styles from "./toast-renderer.module.css";

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

  return (
    <ToastItem
      id={id}
      message={message}
      hasCloseButton={hasCloseButton}
      onDismiss={() => dismiss(id)}
    />
  );
}

export function ToastRenderer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {toasts.map((toast) => (
          <ToastEntry key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
}
