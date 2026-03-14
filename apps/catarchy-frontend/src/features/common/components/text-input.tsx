import { cn } from "@/shared/lib/cn";
import { cva } from "class-variance-authority";
import React, { useId } from "react";
import { Label, type LabelProps } from "./label";

const inputWrapperVariants = cva(
  "flex h-9 w-full items-center border-round px-2",
  {
    variants: {
      disabled: {
        true: "bg-gradient-mono-1",
        false: "bg-white",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export interface TextInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type"
> {
  label?: string;
  labelProps?: Omit<LabelProps, "htmlFor" | "disabled" | "required">;
  trailing?: React.ReactNode;
  type?: "text" | "password";
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      label,
      labelProps,
      trailing,
      disabled = false,
      required = false,
      type = "text",
      error,
      ...rest
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={cn("flex w-full flex-col gap-1", className)}>
        {(label || labelProps?.suffix) && (
          <Label
            htmlFor={id}
            disabled={disabled}
            required={required}
            {...labelProps}
          >
            {label}
          </Label>
        )}
        <div className={inputWrapperVariants({ disabled: !!disabled })}>
          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            required={required}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-base leading-none outline-none",
              disabled
                ? "text-black placeholder:text-gray-500"
                : "text-black placeholder:text-gray-500",
            )}
            {...rest}
          />
          {trailing}
        </div>
        {error && <p className="text text-red-500">{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
