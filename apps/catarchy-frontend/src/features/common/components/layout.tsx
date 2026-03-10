import { cn } from "@/shared/lib/cn";
import { forwardRef } from "react";
import { useKeyboard } from "../hooks/use-keyboard";

interface ScaffoldRootProps {
  children?: React.ReactNode;
  avoidKeyboard?: boolean;
}

const ScaffoldRoot = forwardRef<HTMLDivElement, ScaffoldRootProps>(
  ({ children, avoidKeyboard = false }, ref) => {
    const keyboard = useKeyboard();

    return (
      <div
        ref={ref}
        className="relative mx-auto flex w-(--layout-max-width) flex-col overflow-y-auto overscroll-none bg-white"
        style={{
          height: avoidKeyboard ? keyboard.viewportHeight : "100dvh",
        }}
      >
        {children}
      </div>
    );
  },
);

function ScaffoldBody({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-1 flex-col gap-4", className)}>
      {children}
    </div>
  );
}

function ScaffoldBottom({
  sticky,
  children,
  className,
}: {
  sticky?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const keyboard = useKeyboard();

  return (
    <div
      className={cn(
        sticky && "sticky bottom-0 bg-white",
        keyboard.isOpen ? "" : "pb-safe",
        className,
      )}
    >
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

export const Scaffold = Object.assign(ScaffoldRoot, {
  Body: ScaffoldBody,
  Bottom: ScaffoldBottom,
});
