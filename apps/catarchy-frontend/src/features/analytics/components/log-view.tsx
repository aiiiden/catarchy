import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { useAnalytics } from "../hooks/use-anlytics";

export function LogView({
  eventName,
  children,
  className,
  style,
}: {
  eventName: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { view } = useAnalytics();
  const location = useLocation();
  const elementRef = useRef<HTMLDivElement | null>(null);
  const hasLoggedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current?.firstElementChild as HTMLElement | null;

    if (!element || hasLoggedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasLoggedRef.current) {
          return;
        }

        hasLoggedRef.current = true;
        view({
          eventName,
          properties: {
            fromPage: location.pathname,
          },
        });
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [eventName, location.pathname, view]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
}
