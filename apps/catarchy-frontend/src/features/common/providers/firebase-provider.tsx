import { env } from "@/features/common/lib/env";
import { FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { useMemo } from "react";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const options: FirebaseOptions = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };

  useMemo(() => {
    if (getApps().length === 0) initializeApp(options);
  }, []);

  return <>{children}</>;
}
