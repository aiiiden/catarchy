import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";

export interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  autoResize?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, autoResize, style, rows, ...props }, ref) => {
    return (
      <Box
        rounded
        containerClassName="py-0.75 px-2 has-disabled:bg-gradient-dither-3"
      >
        <textarea
          ref={ref}
          className={cn([
            "appearance-none bg-transparent w-full min-w-0 text-base outline-none resize-none disabled:cursor-not-allowed disabled:text-gray-100 disabled:font-stroke-white",
            !rows && "min-h-[3lh]",
            autoResize && "field-sizing-content",
            className,
          ])}
          {...props}
        />
      </Box>
    );
  },
);
