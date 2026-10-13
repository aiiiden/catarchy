import { useEffect, useRef, useState } from "react";

import { cn } from "../lib/cn";
import { Text } from "./text";
import styles from "./text-marquee.module.css";

const GAP = 16;

interface TextMarqueeProps {
  maxWidth: number;
  children?: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TextMarquee({
  maxWidth,
  children,
  direction = "left",
  speed = 40,
  className,
  style,
}: TextMarqueeProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const [availableWidth, setAvailableWidth] = useState(maxWidth);

  useEffect(() => {
    const text = textRef.current;
    const container = containerRef.current;
    if (!text || !container) return;

    const check = () => {
      setTextWidth(text.scrollWidth);
      setAvailableWidth(container.clientWidth);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(text);
    ro.observe(container);
    return () => ro.disconnect();
  }, [children, maxWidth]);

  const isActive = textWidth > Math.min(maxWidth, availableWidth);
  const cycleWidth = textWidth + GAP;
  const duration = cycleWidth / speed;
  const offset = direction === "left" ? -cycleWidth : cycleWidth;

  return (
    <div
      ref={containerRef}
      className={cn([styles.container, className])}
      style={{ maxWidth, ...style }}
    >
      <Text
        className={cn([styles.track, isActive && styles.active])}
        style={
          isActive
            ? ({
                "--marquee-offset": `${offset}px`,
                "--marquee-duration": `${duration}s`,
                gap: `${GAP}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        <Text ref={textRef}>{children}</Text>
        {isActive && <Text aria-hidden="true">{children}</Text>}
      </Text>
    </div>
  );
}
