import React from "react";
import Tail from "../assets/bubble-tail.svg?react";
import { cn } from "../lib/cn";
import { Box } from "./box";

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
      className={cn(["relative overflow-visible!", className])}
      containerClassName={cn([
        "bg-white px-2 py-1",
        background === "black" && "bg-black text-white",
      ])}
      {...props}
    >
      <Tail color={background} className="absolute -top-1.5 left-0" />
      {children}
    </Box>
  );
});
