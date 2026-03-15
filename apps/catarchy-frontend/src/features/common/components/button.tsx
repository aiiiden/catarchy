import { cn } from "@/shared/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans text-base leading-5 font-medium cursor-pointer transition-opacity text-black text-stroke-white hover:inset-ring-1",
  {
    variants: {
      variant: {
        primary: "bg-gradient-mono-9 active:bg-gradient-mono-8",
        secondary:
          "bg-gradient-mono-2 border border-black active:bg-gradient-mono-1",
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
  extends
    React.ComponentPropsWithoutRef<"button">,
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
