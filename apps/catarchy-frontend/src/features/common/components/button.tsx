import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";

export const buttonStyles = cva(["cursor-pointer leading-none w-full"], {
  variants: {
    variant: {
      primary:
        "bg-black text-black hover:bg-white hover:bg-gradient-dither-8! font-stroke-white active:bg-gradient-dither-7!",
      secondary:
        "bg-gradient-dither-2 font-stroke-white hover:bg-gradient-dither-3 active:bg-gradient-dither-4",
      outline:
        "hover:bg-gradient-dither-1 active:bg-gradient-dither-2 font-stroke-white",
      ghost:
        "bg-transparent hover:bg-gradient-dither-1 active:bg-gradient-dither-2 font-stroke-white",
    },
    size: {
      default: "px-1.75 h-7.5",
      big: "px-3.5 h-14 min-w-14",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonStyles>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Box
        as="button"
        aria-busy
        ref={ref}
        className={cn([className, variant === "ghost" && "border-none!"])}
        containerClassName={buttonStyles({ variant, size })}
        rounded={variant !== "ghost"}
        {...props}
      />
    );
  },
);
