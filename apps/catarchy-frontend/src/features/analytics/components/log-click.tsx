import { useLocation } from "@tanstack/react-router";
import React from "react";

import { useAnalytics } from "../hooks/use-anlytics";

export function LogClick({
  eventName,
  children,
}: {
  eventName: string;
  children: React.ReactNode;
}) {
  const { click } = useAnalytics();
  const location = useLocation();

  const clonedChild = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const el = child as React.ReactElement<{
        onClick?: (e: React.MouseEvent) => void;
      }>;
      const existingOnClick = el.props.onClick;

      return React.cloneElement(el, {
        onClick: (e: React.MouseEvent) => {
          click({ eventName, properties: { fromPage: location.pathname } });
          if (existingOnClick) {
            existingOnClick(e);
          }
        },
      });
    }
    return child;
  });

  return <>{clonedChild}</>;
}
