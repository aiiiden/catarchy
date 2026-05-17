import React from "react";
import { cn } from "../lib/cn";
import { Box } from "./box";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "default" | "big";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  native?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      disabled,
      native,
      ...props
    },
    ref,
  ) => {
    if (native) {
      return (
        <button
          ref={ref}
          className={className}
          disabled={disabled}
          {...props}
        />
      );
    }

    return (
      <Box
        as="button"
        ref={ref}
        ditherLevel={variant === "secondary" ? 2 : 0}
        isDark={variant === "primary"}
        className={cn(
          variant === "ghost" && styles.noBorder,
          disabled && styles.disabled,
          className,
        )}
        containerClassName={cn(
          styles.container,
          (variant === "primary" ||
            variant === "secondary" ||
            variant === "outline") &&
            "font-stroke-white",
        )}
        data-variant={variant}
        data-size={size}
        rounded={variant !== "ghost"}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
