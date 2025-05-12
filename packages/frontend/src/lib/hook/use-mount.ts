import { useEffect, useRef } from 'react';

export function useMount(callback: () => void) {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      callback();
      mounted.current = true;
    }
  }, [callback]);

  return {
    mounted: mounted.current,
  };
}
