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
      // cast to ReactElement with any props so we can safely access/override onClick
      const el = child as React.ReactElement<any>;
      const existingOnClick = el.props.onClick as
        | ((e: React.MouseEvent) => void)
        | undefined;

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
