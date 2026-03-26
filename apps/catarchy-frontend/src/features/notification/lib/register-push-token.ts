import { messaging } from "@/features/common/providers/firebase-provider";
import { env } from "@/features/config/lib/env";
import { api } from "@/shared/api";
import { getToken } from "firebase/messaging";

export async function registerPushToken(): Promise<void> {
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const swRegistration =
      (await navigator.serviceWorker.getRegistration(
        "/firebase-messaging-sw.js",
      )) ??
      (await navigator.serviceWorker.register("/firebase-messaging-sw.js"));

    const token = await getToken(messaging, {
      vapidKey: env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    if (!token) return;

    const { error } = await api.notification.token.post({ token });
  } catch (e) {
    // DO NOTHING
  }
}
