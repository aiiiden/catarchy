import React from "react";

import { cn } from "../lib/cn";
import styles from "./label.module.css";
import { Text } from "./text";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const isChildrenString = typeof children === "string";

    return (
      <label ref={ref} className={cn(styles.label, className)} {...props}>
        {isChildrenString ? <Text size="small">{children}</Text> : children}
        {required && (
          <Text size="small" className={styles.requiredMark}>
            *
          </Text>
        )}
      </label>
    );
  },
);
