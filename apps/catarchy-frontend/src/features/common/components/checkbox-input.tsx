import React from "react";
import CheckboxSymbol from "../assets/checkbox-symbol.svg?react";
import { cn } from "../lib/cn";
import { Text } from "./text";

export interface CheckboxInputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "children"
> {
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
      <CheckboxSymbol className="text-black" />
    );
    const offState = uncheckedIndicator ?? (
      <CheckboxSymbol className="text-white" />
    );

    const setInputRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
        return;
      }

      if (ref) {
        ref.current = node;
      }
    };

    const handleIndicatorClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 select-none",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-default",
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
          className="peer sr-only"
          {...props}
        />

        <span
          onClick={handleIndicatorClick}
          aria-hidden="true"
          className={cn(
            "inline-flex size-5 items-center justify-center peer-focus-visible:outline-1 peer-focus-visible:outline-black peer-checked:[&_.checkbox-off]:hidden peer-checked:[&_.checkbox-on]:inline-flex",
            !disabled && "cursor-pointer",
            indicatorClassName,
          )}
        >
          <span className="checkbox-off inline-flex">{offState}</span>
          <span className="checkbox-on hidden">{onState}</span>
        </span>

        {typeof label === "string" ? (
          <Text as="label" htmlFor={inputId} className="cursor-pointer">
            {label}
          </Text>
        ) : label != null ? (
          <Text as="label" htmlFor={inputId} className="cursor-pointer">
            {label}
          </Text>
        ) : null}
      </div>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

export const Checkbox = CheckboxInput;
