import React from "react";

import Tail from "../assets/bubble-tail.svg?react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import styles from "./bubble-message.module.css";

export interface BubbleMessageProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  background?: "white" | "black";
}

export const BubbleMessage = React.forwardRef<
  HTMLDivElement,
  BubbleMessageProps
>(({ children, className, background = "white", ...props }, ref) => {
  return (
    <Box
      ref={ref}
      rounded
      isDark={background === "black"}
      className={cn(styles.root, className)}
      containerClassName={cn(
        styles.container,
        background === "black" && styles.containerDark,
      )}
      {...props}
    >
      <Tail color={background} className={styles.tail} />
      {children}
    </Box>
  );
});
