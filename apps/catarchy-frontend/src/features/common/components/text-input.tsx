import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";

export interface TextInputProps extends React.ComponentPropsWithoutRef<"input"> {
  trailingSlot?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, trailingSlot, ...props }, ref) => {
    const hasTrailingSlot = Boolean(trailingSlot);

    return (
      <Box
        rounded
        className="h-9"
        containerClassName="py-0.75 px-2 has-disabled:bg-gradient-dither-3 flex items-center gap-1"
      >
        <input
          ref={ref}
          className={cn([
            "appearance-none bg-transparent w-full min-w-0 leading-0 text-base outline-none disabled:cursor-not-allowed disabled:text-gray-100 disabled:font-stroke-white",
            className,
          ])}
          {...props}
        />

        {hasTrailingSlot && (
          <div className="flex items-center h-4">{trailingSlot}</div>
        )}
      </Box>
    );
  },
);
