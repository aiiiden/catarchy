import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";

export interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, leadingSlot, trailingSlot, ...props }, ref) => {
    return (
      <Box
        rounded
        className="h-11.5"
        containerClassName="px-2 has-disabled:bg-gradient-dither-3 flex items-center gap-1"
      >
        {leadingSlot && (
          <div className="flex items-center h-4 shrink-0">{leadingSlot}</div>
        )}

        <input
          ref={ref}
          className={cn([
            "h-9.5 appearance-none bg-transparent w-full min-w-0 leading-0 text-base outline-none disabled:cursor-not-allowed disabled:text-gray-100 disabled:font-stroke-white",
            className,
          ])}
          {...props}
        />

        {trailingSlot && (
          <div className="flex items-center h-4 shrink-0">{trailingSlot}</div>
        )}
      </Box>
    );
  },
);
