/// <reference lib="webworker" />

import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";

import { env } from "./features/common/lib/env";

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const firebaseApp = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  const title = payload.notification?.title ?? payload.data?.title;
  const body = payload.notification?.body ?? payload.data?.body;
  if (!title) return;

  const url = payload.data?.url;
  const data = url ? { url } : undefined;

  self.registration.showNotification(title, {
    body,
    icon: "/icons/icon-192x192.png",
    data,
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const fcmMsg = event.notification.data?.FCM_MSG;
  const url =
    event.notification.data?.url ??
    fcmMsg?.fcmOptions?.link ??
    fcmMsg?.data?.url;
  if (!url) return;

  event.stopImmediatePropagation();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const existing = windowClients.find(
          (client) => client.url === url && "focus" in client,
        );
        if (existing) return existing.focus();
        return self.clients.openWindow(url);
      }),
  );
});
