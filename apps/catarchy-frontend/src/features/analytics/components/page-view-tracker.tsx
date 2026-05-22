import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

import { useAnalytics } from "../hooks/use-anlytics";

export function PageViewTracker() {
  const location = useLocation();
  const { pageView } = useAnalytics();

  useEffect(() => {
    // Track page view on location change
    pageView({
      path: location.pathname,
      properties: {
        fromPage: location.pathname,
      },
    });
  }, [location.pathname, pageView]);

  return <></>;
}
