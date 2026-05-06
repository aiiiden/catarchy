import ReactGA from "react-ga4";

interface AnalyticsProperties {
  fromPage?: string;
}

function logger(eventName: string, properties?: AnalyticsProperties) {
  console.log(`[Analytics] Event: ${eventName}`, properties);
}

export function useAnalytics() {
  const isLocal = import.meta.env.DEV;

  function logEvent(eventName: string, properties?: AnalyticsProperties) {
    if (isLocal) {
      logger(eventName, properties);
      return;
    }

    ReactGA.event(eventName, properties);
  }

  function view({
    eventName,
    properties,
  }: {
    eventName: string;
    properties?: AnalyticsProperties;
  }) {
    if (isLocal) {
      logger(`view_${eventName}`, properties);
      return;
    }
    ReactGA.event(`view_${eventName}`, {
      from_page: properties?.fromPage,
    });
  }

  function click({
    eventName,
    properties,
  }: {
    eventName: string;
    properties?: AnalyticsProperties;
  }) {
    if (isLocal) {
      logger(`click_${eventName}`, properties);
      return;
    }
    ReactGA.event(`click_${eventName}`, {
      from_page: properties?.fromPage,
    });
  }

  function pageView({
    path,
  }: {
    path: string;
    properties?: AnalyticsProperties;
  }) {
    ReactGA.send({ hitType: "pageview", page: path });

    if (isLocal) {
      logger(`pageview_${path}`);
    }
  }
  return {
    view,
    pageView,
    click,
    logEvent,
  };
}
