import { cn } from "@/shared/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center font-medium font-sans text-base text-black text-stroke-white leading-5 transition-opacity hover:inset-ring-1",
  {
    variants: {
      variant: {
        primary: "bg-gradient-mono-9 active:bg-gradient-mono-8",
        secondary:
          "border border-black bg-gradient-mono-2 active:bg-gradient-mono-1",
        ghost: "active:bg-gradient-mono-1",
      },
      size: {
        default: "h-12 px-4 py-3",
        small: "h-8 p-2",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, fullWidth, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
