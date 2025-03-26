import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export interface BottomSheetProps {
  position?: 'bottom';
  children: React.ReactNode;
}

export function BottomSheet({
  position = 'bottom',
  children,
}: BottomSheetProps) {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-50% via-black/30 to-black/40"
      ></motion.div>
      <motion.div
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ duration: 0.3, bounce: 0 }}
        className={cn([
          'bg-white px-6 pb-6 pt-8',
          position === 'bottom' &&
            'absolute inset-x-0 bottom-0 rounded-tl-2xl rounded-tr-2xl',
        ])}
      >
        <div>{children}</div>
      </motion.div>
    </div>
  );
}

export default BottomSheet;
