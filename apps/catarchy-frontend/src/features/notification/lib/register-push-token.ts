import { messaging } from "@/features/common/providers/firebase-provider";
import { env } from "@/features/config/lib/env";
import { api } from "@/shared/api";
import { getToken } from "firebase/messaging";

export async function registerPushToken(): Promise<void> {
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      alert("[FCM] Notification or serviceWorker not supported");
      return;
    }

    const permission = await Notification.requestPermission();
    alert(`[FCM] permission: ${permission}`);
    if (permission !== "granted") return;

    const swRegistration =
      (await navigator.serviceWorker.getRegistration("/firebase-messaging-sw.js")) ??
      (await navigator.serviceWorker.register("/firebase-messaging-sw.js"));
    alert(`[FCM] SW scope: ${swRegistration.scope}`);

    const token = await getToken(messaging, {
      vapidKey: env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });
    alert(`[FCM] token: ${token ? token.slice(0, 20) + "..." : "null"}`);

    if (!token) return;

    const { error } = await api.notification.token.post({ token });
    alert(`[FCM] register result: ${error ? JSON.stringify(error) : "ok"}`);
  } catch (e) {
    alert(`[FCM] error: ${e}`);
  }
}
