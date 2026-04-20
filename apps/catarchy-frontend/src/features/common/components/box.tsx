import React from "react";
import { cn } from "../lib/cn";
import styles from "./box.module.css";

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type BoxRef<T extends React.ElementType = "div"> =
  React.ComponentPropsWithRef<T>["ref"];

export type BoxProps<T extends React.ElementType = "div"> = AsProp<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof AsProp<T>> & {
    rounded?: boolean;
    className?: string;
    containerClassName?: string;
    style?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    containerRef?: BoxRef<T>;

    /**
     * if true, the background becomes transparent and the inner padding is reduced by -2px.
     * Therefore, white background processing is required inside due to the limitations of border-image.
     */
    tight?: boolean;
  };

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref && typeof ref === "object" && "current" in ref) {
    (ref as React.RefObject<T | null>).current = value;
  }
}

function BoxInner(
  {
    as,
    containerRef,
    rounded = false,
    children,
    className,
    containerClassName,
    style,
    containerStyle,
    tight = false,
    ...rest
  }: BoxProps<React.ElementType>,
  ref: React.ForwardedRef<unknown>,
) {
  const Component = (as ?? "div") as React.ElementType;

  const ditherMatch = containerClassName?.match(
    /(?<![a-z]:)bg-gradient-dither-(\d+)/,
  );
  const ditherLevel = ditherMatch ? parseInt(ditherMatch[1]) : 0;

  const isDark =
    /\bbg-black\b/.test(containerClassName ?? "") || ditherLevel > 7;
  const borderDithered = ditherLevel > 0;

  const borderStyle = !rounded
    ? undefined
    : !borderDithered
      ? isDark
        ? styles.dark
        : styles.light
      : ditherLevel > 3
        ? isDark
          ? styles.darkMoreDither
          : styles.moreDither
        : isDark
          ? styles.darkDithered
          : styles.dithered;

  return (
    <div
      className={cn([
        styles.border,
        borderStyle,
        tight && styles.tight,
        className,
      ])}
      style={style}
    >
      <Component
        ref={(node: unknown) => {
          assignRef(containerRef as React.Ref<unknown> | undefined, node);
          assignRef(ref, node);
        }}
        style={{ ...containerStyle }}
        className={cn(
          "bg-white",
          tight &&
            "bg-transparent relative z-2 -m-0.5 w-[calc(100%+4px)] min-h-[calc(100%+4px)]",
          containerClassName,
        )}
        {...rest}
      >
        {children}
      </Component>
    </div>
  );
}

type BoxComponent = <T extends React.ElementType = "div">(
  props: BoxProps<T> & { ref?: BoxRef<T> },
) => React.ReactElement | null;

const BoxForwardRef = React.forwardRef(BoxInner);
BoxForwardRef.displayName = "Box";

export const Box = BoxForwardRef as unknown as BoxComponent;
