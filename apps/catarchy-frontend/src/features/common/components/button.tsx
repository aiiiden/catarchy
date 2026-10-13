import React from "react";

import { cn } from "../lib/cn";
import { useHaptic } from "../lib/haptic";
import { Box } from "./box";
import styles from "./button.module.css";
import { Text } from "./text";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "default" | "big";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: boolean;
  native?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      icon,
      disabled,
      native,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const { trigger } = useHaptic();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      trigger();
      onClick?.(e);
    };

    const content = React.Children.map(children, (child) =>
      typeof child === "string" || typeof child === "number" ? (
        <Text>{child}</Text>
      ) : (
        child
      ),
    );

    if (native) {
      return (
        <button
          ref={ref}
          className={className}
          disabled={disabled}
          onClick={handleClick}
          {...props}
        >
          {content}
        </button>
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
        data-icon={icon ? "true" : undefined}
        rounded={variant !== "ghost"}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {content}
      </Box>
    );
  },
);

Button.displayName = "Button";
