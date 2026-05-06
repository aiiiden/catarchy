import { env } from "@/features/common";
import { useEffect } from "react";
import ReactGA from "react-ga4";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const isLocal = import.meta.env.DEV;
  const gaMesurementId = env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (isLocal) return;
    if (!gaMesurementId) return;
    if (ReactGA.isInitialized) return;

    ReactGA.initialize([
      {
        trackingId: gaMesurementId,
      },
    ]);
  }, []);

  return <>{children}</>;
}
