import React from "react";
import { cn } from "../lib/cn";
import { Text } from "./text";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const isChildrenString = typeof children === "string";

    return (
      <label ref={ref} className={cn("leading-3", className)} {...props}>
        {isChildrenString ? (
          <Text className="text-sm leading-none">{children}</Text>
        ) : (
          children
        )}
        {required && <Text className="text-xs leading-none ml-0.5">*</Text>}
      </label>
    );
  },
);
