import React, { useEffect, useState } from 'react';

import { motion } from 'motion/react';
import { cn } from '../utils';
import LoadingScreen from '@/components/layout/loading-screen';

export function withFadeTransition(
  Component: React.ComponentType,
  options?: {
    duration?: number;
    initialOpacity?: number;
    exitOpacity?: number;
    waitPromise?: () => Promise<void>;
  },
) {
  return function FadeTransitionComponent(
    props: React.ComponentProps<typeof Component>,
  ) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (options?.waitPromise) {
        options.waitPromise().then(() => {
          setIsReady(true);
        });
      } else {
        setIsReady(true);
      }
    }, [options?.waitPromise]);

    return (
      <>
        {!isReady && <LoadingScreen />}

        <motion.div
          className={cn(
            'w-full h-full',
            !isReady && 'pointer-events-none opacity-0',
          )}
          initial={{ opacity: options?.initialOpacity ?? 0 }}
          animate={{ opacity: isReady ? 1 : (options?.initialOpacity ?? 0) }}
          exit={{ opacity: options?.exitOpacity ?? 0 }}
          transition={{ duration: options?.duration ?? 0.5 }}
        >
          <Component {...props} />
        </motion.div>
      </>
    );
  };
}
