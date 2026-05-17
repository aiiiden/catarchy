import React from "react";
import CheckboxSymbol from "../assets/checkbox-symbol.svg?react";
import { cn } from "../lib/cn";
import styles from "./checkbox-input.module.css";
import { Text } from "./text";

export interface CheckboxInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "type" | "children"> {
  label?: React.ReactNode;
  checkedIndicator?: React.ReactNode;
  uncheckedIndicator?: React.ReactNode;
  indicatorClassName?: string;
}

export const CheckboxInput = React.forwardRef<
  HTMLInputElement,
  CheckboxInputProps
>(
  (
    {
      id,
      className,
      disabled = false,
      label,
      checkedIndicator,
      uncheckedIndicator,
      indicatorClassName,
      "aria-label": ariaLabel,
      name,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const fallbackAriaLabel =
      typeof name === "string" && name.length > 0
        ? `${name} checkbox`
        : "Checkbox";
    const onState = checkedIndicator ?? (
      <CheckboxSymbol style={{ color: "var(--color-black)" }} />
    );
    const offState = uncheckedIndicator ?? (
      <CheckboxSymbol style={{ color: "var(--color-white)" }} />
    );

    const setInputRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
        return;
      }
      if (ref) ref.current = node;
    };

    const handleIndicatorClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    return (
      <div
        className={cn(
          styles.root,
          disabled ? styles.disabled : styles.cursorDefault,
          className,
        )}
      >
        <input
          id={inputId}
          ref={setInputRefs}
          type="checkbox"
          name={name}
          disabled={disabled}
          aria-label={ariaLabel ?? (label ? undefined : fallbackAriaLabel)}
          className={styles.input}
          {...props}
        />

        <span
          onClick={handleIndicatorClick}
          aria-hidden="true"
          className={cn(
            styles.indicator,
            !disabled && styles.clickable,
            indicatorClassName,
          )}
        >
          <span className={styles.off}>{offState}</span>
          <span className={styles.on}>{onState}</span>
        </span>

        {label != null && (
          <Text as="label" htmlFor={inputId} className={styles.labelText}>
            {label}
          </Text>
        )}
      </div>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

export const Checkbox = CheckboxInput;
