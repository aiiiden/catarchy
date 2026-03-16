import { cn } from "@/shared/lib/cn";
import React from "react";

export interface LabelProps extends React.ComponentPropsWithoutRef<"label"> {
  required?: boolean;
  disabled?: boolean;
  suffix?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      className,
      required = false,
      disabled = false,
      suffix,
      ...rest
    },
    ref,
  ) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is passed via ...rest
      <label
        ref={ref}
        className={cn(
          "flex h-4 items-center justify-between text-base",
          className,
        )}
        {...rest}
      >
        <div className="flex items-center gap-0.5">
          {children && (
            <span className={disabled ? "text-gray-500" : "text-black"}>
              {children}
            </span>
          )}
          {required && (
            <span className={cn([disabled ? "text-gray-500" : "text-black"])}>
              *
            </span>
          )}
        </div>
        {suffix}
      </label>
    );
  },
);

Label.displayName = "Label";
