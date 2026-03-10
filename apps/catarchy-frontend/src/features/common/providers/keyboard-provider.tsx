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
      initialHeight:
        vv?.height ?? (typeof window !== "undefined" ? window.innerHeight : 0),
      viewportHeight:
        vv?.height ?? (typeof window !== "undefined" ? window.innerHeight : 0),
      viewportOffsetTop: vv?.offsetTop ?? 0,
    };
  });

  const rafIdRef = useRef<number | null>(null);
  const lastValuesRef = useRef({ height: 0, offsetTop: 0 });
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const vv = window.visualViewport;
    const initialHeight = vv?.height ?? window.innerHeight;

    const handleViewportChange = () => {
      // RAF로 throttle
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;

        const height = vv?.height ?? window.innerHeight;
        const offsetTop = vv?.offsetTop ?? 0;

        // 값이 변경되었을 때만 setState
        if (
          lastValuesRef.current.height !== height ||
          lastValuesRef.current.offsetTop !== offsetTop
        ) {
          lastValuesRef.current = { height, offsetTop };
          setState({
            initialHeight,
            viewportHeight: height,
            viewportOffsetTop: offsetTop,
          });
        }
      });
    };

    // iOS Safari에서 인풋 포커스 시 자동 스크롤 방지
    const preventScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    handleViewportChange();

    if (vv) {
      vv.addEventListener("resize", handleViewportChange);
    }

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", preventScroll);

    // 뷰포트가 안정될 때까지 주기적으로 체크
    const pollViewport = (duration: number, onComplete?: () => void) => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        handleViewportChange();
        preventScroll();
        if (Date.now() - startTime >= duration) {
          clearInterval(interval);
          onComplete?.();
        }
      }, 100);
      return interval;
    };

    let pollIntervalId: ReturnType<typeof setInterval> | null = null;

    const handleFocus = (e: FocusEvent) => {
      preventScroll();
      if (pollIntervalId) clearInterval(pollIntervalId);

      const target = e.target as HTMLElement;
      if (!target) return;

      pollIntervalId = pollViewport(500, () => {
        // 키보드가 실제로 열렸을 때만 스크롤
        const { initialHeight, viewportHeight } = stateRef.current;
        const isKeyboardOpen = initialHeight - viewportHeight > 100;
        if (isKeyboardOpen) {
          // 요소가 이미 보이는 영역에 있으면 스크롤하지 않음
          const rect = target.getBoundingClientRect();
          const visibleTop = 0;
          const visibleBottom = viewportHeight;
          const isVisible = rect.top >= visibleTop && rect.bottom <= visibleBottom;

          if (!isVisible) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          preventScroll();
        }
      });
    };

    const handleBlur = () => {
      preventScroll();
      if (pollIntervalId) clearInterval(pollIntervalId);
      pollIntervalId = pollViewport(300);
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("focusout", handleBlur);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (pollIntervalId) {
        clearInterval(pollIntervalId);
      }
      if (vv) {
        vv.removeEventListener("resize", handleViewportChange);
      }
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", preventScroll);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("focusout", handleBlur);
    };
  }, []);

  const value = useMemo<KeyboardContextValue>(() => {
    const keyboardHeight = state.initialHeight - state.viewportHeight;
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
