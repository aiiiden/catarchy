import { createContext, useEffect, useMemo, useRef, useState } from "react";

interface KeyboardContextValue {
  isOpen: boolean;
  height: number;
  viewportHeight: number;
  viewportOffsetTop: number;
}

export const KeyboardContext = createContext<KeyboardContextValue | undefined>(
  undefined,
);

interface KeyboardProviderProps {
  children: React.ReactNode;
}

export function KeyboardProvider({ children }: KeyboardProviderProps) {
  const [state, setState] = useState(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    return {
      viewportHeight: vv?.height ?? (typeof window !== "undefined" ? window.innerHeight : 0),
      viewportOffsetTop: vv?.offsetTop ?? 0,
    };
  });

  const maxHeightRef = useRef<number>(
    typeof window !== "undefined"
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 0,
  );
  const lastHeightRef = useRef<number>(maxHeightRef.current);

  useEffect(() => {
    const vv = window.visualViewport;

    const preventScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const handleViewportChange = () => {
      const height = vv?.height ?? window.innerHeight;
      const offsetTop = vv?.offsetTop ?? 0;

      if (height > maxHeightRef.current) {
        maxHeightRef.current = height;
      }

      lastHeightRef.current = height;
      setState({ viewportHeight: height, viewportOffsetTop: offsetTop });
    };

    if (vv) vv.addEventListener("resize", handleViewportChange);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", preventScroll);

    const handleFocus = (e: FocusEvent) => {
      preventScroll();
      const target = e.target as HTMLElement;
      if (!target) return;

      setTimeout(() => {
        const keyboardHeight = maxHeightRef.current - lastHeightRef.current;
        const isKeyboardOpen = keyboardHeight > 100;
        if (isKeyboardOpen) {
          const rect = target.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= lastHeightRef.current;
          if (!isVisible) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          preventScroll();
        }
      }, 500);
    };

    const handleBlur = () => {
      preventScroll();
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      if (vv) vv.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", preventScroll);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  const value = useMemo<KeyboardContextValue>(() => {
    const keyboardHeight = maxHeightRef.current - state.viewportHeight;
    return {
      isOpen: keyboardHeight > 100,
      height: Math.max(0, keyboardHeight),
      viewportHeight: state.viewportHeight,
      viewportOffsetTop: state.viewportOffsetTop,
    };
  }, [state]);

  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  );
}
