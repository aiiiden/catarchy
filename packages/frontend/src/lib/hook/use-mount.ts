import { useEffect, useState } from 'react';

export function useMount(callback?: () => void) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    callback?.();
    setMounted(true);
  }, []);

  return {
    mounted,
  };
}
