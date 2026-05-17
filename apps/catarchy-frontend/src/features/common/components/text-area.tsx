import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import styles from "./text-area.module.css";

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  autoResize?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, autoResize, style, rows, ...props }, ref) => {
    return (
      <Box rounded containerClassName={styles.container}>
        <textarea
          ref={ref}
          className={cn(
            styles.textarea,
            !rows && styles.minHeight,
            autoResize && styles.autoResize,
            className,
          )}
          style={style}
          rows={rows}
          {...props}
        />
      </Box>
    );
  },
);
