import { api, env } from "@/features/common";
import {
  NotificationContext,
  PermissionState,
} from "@/features/notification/hooks/use-notification";
import { getApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useCallback, useEffect, useMemo, useState } from "react";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permissionState, setPermissionState] = useState<PermissionState>(() =>
    "Notification" in window ? Notification.permission : "denied",
  );
  const [isRegistered, setIsRegistered] = useState(false);

  const messaging = useMemo(() => {
    if (!("serviceWorker" in navigator) || getApps().length === 0) return null;
    try {
      return getMessaging(getApp());
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!messaging || Notification.permission !== "granted") return;
    getToken(messaging, { vapidKey: env.VITE_FIREBASE_VAPID_KEY })
      .then((token) => { if (token) setIsRegistered(true); })
      .catch(() => {});
  }, [messaging]);

  useEffect(() => {
    if (!messaging) return;
    return onMessage(messaging, (payload) => {
      const { title, body, url } = payload.data ?? {};
      if (!title || Notification.permission !== "granted") return;

      const notification = new Notification(title, {
        body,
        icon: "/icons/icon-192x192.png",
      });
      if (url) {
        notification.onclick = () => window.open(url, "_blank");
      }
    });
  }, [messaging]);

  const register = useCallback(async (): Promise<boolean> => {
    if (permissionState === "denied" || permissionState === "requesting")
      return false;
    if (!messaging) return false;

    let permission = Notification.permission;

    if (permission === "default") {
      setPermissionState("requesting");
      permission = await Notification.requestPermission();
      setPermissionState(permission);
    }

    if (permission !== "granted") return false;

    const token = await getToken(messaging, {
      vapidKey: env.VITE_FIREBASE_VAPID_KEY,
    });
    await api.notification.token.post({ token });
    setIsRegistered(true);

    return true;
  }, [messaging, permissionState]);

  return (
    <NotificationContext.Provider
      value={{ isRegistered, permissionState, register }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
