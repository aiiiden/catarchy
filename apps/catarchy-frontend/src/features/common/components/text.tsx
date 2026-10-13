import React from "react";

import { cn } from "../lib/cn";
import styles from "./text.module.css";

export type TextTag =
  | "i"
  | "em"
  | "s"
  | "strong"
  | "small"
  | "cite"
  | "pre"
  | "dt"
  | "dd"
  | "label"
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type TextSize = "xsmall" | "small" | "normal" | "large" | "xlarge";

export type TextProps<T extends TextTag = "span"> =
  React.ComponentPropsWithRef<T> & {
    as?: T;
    /** Inherits the nearest Text size; defaults to normal (16px) at the root. */
    size?: TextSize;
    boxTrim?: boolean;
  };

export function Text<T extends TextTag = "span">({
  as,
  size,
  className,
  boxTrim,
  ...props
}: TextProps<T>) {
  const Tag = (as ?? "span") as React.ElementType;

  return (
    <Tag
      {...props}
      className={cn(
        styles.root,
        boxTrim && (as ?? "span") !== "span" && "text-box-trim",
        className,
      )}
      data-text-size={size}
    />
  );
}
