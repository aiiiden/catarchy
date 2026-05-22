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
    ditherLevel?: number;
    isDark?: boolean;

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

function computeBorderVariant(
  ditherLevel: number,
  isDark: boolean,
  rounded: boolean,
): string | undefined {
  if (!rounded) return undefined;
  if (ditherLevel === 0) return isDark ? "dark" : "light";
  if (ditherLevel <= 3) return isDark ? "dark-dithered" : "dithered";
  return isDark || ditherLevel > 7 ? "dark-more-dither" : "more-dither";
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
    ditherLevel = 0,
    isDark = false,
    ...rest
  }: BoxProps<React.ElementType>,
  ref: React.ForwardedRef<unknown>,
) {
  const Component = (as ?? "div") as React.ElementType;
  const borderVariant = computeBorderVariant(ditherLevel, isDark, rounded);

  return (
    <div
      data-border-variant={borderVariant}
      className={cn([styles.border, tight && styles.tight, className])}
      style={style}
    >
      <Component
        ref={(node: unknown) => {
          assignRef(containerRef as React.Ref<unknown> | undefined, node);
          assignRef(ref, node);
        }}
        style={{ ...containerStyle }}
        className={cn(
          styles.bgWhite,
          tight && styles.tightContainer,
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
