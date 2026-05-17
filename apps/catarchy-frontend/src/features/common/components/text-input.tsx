import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import styles from "./text-input.module.css";

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, leadingSlot, trailingSlot, ...props }, ref) => {
    return (
      <Box
        rounded
        className={styles.wrapper}
        containerClassName={styles.container}
      >
        {leadingSlot && <div className={styles.slot}>{leadingSlot}</div>}

        <input ref={ref} className={cn(styles.input, className)} {...props} />

        {trailingSlot && <div className={styles.slot}>{trailingSlot}</div>}
      </Box>
    );
  },
);
