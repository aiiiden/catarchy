import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { useMemo } from "react";

import { env } from "../lib/env";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const options = useMemo<FirebaseOptions>(() => {
    const apiKey = env.VITE_FIREBASE_API_KEY;
    const projectId = env.VITE_FIREBASE_PROJECT_ID;
    const messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID;
    const appId = env.VITE_FIREBASE_APP_ID;

    if (!apiKey || !projectId || !messagingSenderId || !appId) {
      throw new Error("Firebase configuration is missing");
    }

    return {
      apiKey,
      projectId,
      messagingSenderId,
      appId,
    };
  }, []);

  useMemo(() => {
    if (getApps().length === 0) initializeApp(options);
  }, [options]);

  return <>{children}</>;
}
