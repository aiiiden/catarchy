import { createContext, useContext } from "react";

export type PermissionState = NotificationPermission | "requesting";

export type NotificationContextValue = {
  isRegistered: boolean;
  permissionState: PermissionState;
  register: () => Promise<boolean>;
};

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}
