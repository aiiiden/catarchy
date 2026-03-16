import { env } from "@/features/config/lib/env";
import { initializeApp } from "firebase/app";
import { onMessage, getMessaging } from "firebase/messaging";
import { useEffect } from "react";

const firebaseApp = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});

export const messaging = getMessaging(firebaseApp);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const { title, body } = payload.notification ?? {};
      if (title && Notification.permission === "granted") {
        new Notification(title, { body, icon: "/icons/icon-192x192.png" });
      }
    });
    return unsubscribe;
  }, []);

  return <>{children}</>;
}
