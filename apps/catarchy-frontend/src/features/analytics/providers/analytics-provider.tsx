import { useEffect } from "react";
import ReactGA from "react-ga4";

import { env } from "@/features/common";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const isLocal = import.meta.env.DEV;
  const gaMeasurementId = env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (isLocal) return;
    if (!gaMeasurementId) return;
    if (ReactGA.isInitialized) return;

    ReactGA.initialize([
      {
        trackingId: gaMeasurementId,
      },
    ]);
  }, [gaMeasurementId, isLocal]);

  return <>{children}</>;
}
