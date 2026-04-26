import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";

export const buttonStyles = cva(
  [
    "cursor-pointer leading-none w-full h-full justify-center items-center flex select-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-black text-black hover:bg-white hover:bg-gradient-dither-8! font-stroke-white active:bg-gradient-dither-7! focus:bg-gradient-dither-7!",
        secondary:
          "bg-gradient-dither-2 font-stroke-white hover:bg-gradient-dither-3 active:bg-gradient-dither-4 focus:bg-gradient-dither-4",
        outline:
          "hover:bg-gradient-dither-1 active:bg-gradient-dither-2 focus:bg-gradient-dither-2 font-stroke-white",
        ghost:
          "bg-transparent hover:bg-gradient-dither-1 active:bg-gradient-dither-1 focus:bg-gradient-dither-1 font-stroke-white",
      },
      size: {
        small: "px-1.25 min-h-8",
        default: "px-1.75 min-h-10",
        big: "px-3.5 min-h-12 min-w-14 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonStyles>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, disabled, ...props }, ref) => {
    return (
      <Box
        as="button"
        ref={ref}
        className={cn([
          className,
          variant === "ghost" && "border-none!",
          disabled && "opacity-20",
        ])}
        containerClassName={buttonStyles({ variant, size })}
        rounded={variant !== "ghost"}
        {...props}
      />
    );
  },
);
