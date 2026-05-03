self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) =>
  event.waitUntil(clients.claim()),
);

importScripts(
  "https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyBsr73zFRUOVtsHutsb-3QatSH092K9pa8",
  projectId: "catarchy-general",
  messagingSenderId: "1061953933956",
  appId: "1:1061953933956:web:3272eabbfad4776c9a68d1",
});

firebase.messaging();
