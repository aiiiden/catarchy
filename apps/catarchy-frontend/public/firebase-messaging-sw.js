self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) =>
  event.waitUntil(clients.claim()),
);

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data = {};
  try {
    const payload = event.data.json();
    data = payload.data ?? payload;
  } catch {
    return;
  }

  const { title, body, url } = data;
  if (!title) return;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icons/icon-192x192.png",
      data: { url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url;
  if (!url) return;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const existing = windowClients.find(
          (c) => c.url === url && "focus" in c,
        );
        if (existing) return existing.focus();
        return clients.openWindow(url);
      }),
  );
});
