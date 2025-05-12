import { useEffect, useRef, useState } from 'react';
import styles from './typing.module.css';
import { cn } from '@/lib/classname';

interface TypingProps {
  children: string;
  speed?: number;
  startDelay?: number;
  cursor?: string;
  onEnd?: () => void;
  className?: HTMLElement['className'];
}

export const Typing = ({
  children,
  speed = 80,
  startDelay = 0,
  onEnd,
  className,
}: TypingProps) => {
  const [done, setDone] = useState(false);
  const calledEnd = useRef(false);

  useEffect(() => {
    if (typeof onEnd !== 'function') return;
    const total = startDelay + children.length * speed;
    const timer = setTimeout(() => {
      if (!calledEnd.current) {
        calledEnd.current = true;
        setDone(true);
        onEnd();
      }
    }, total);
    return () => clearTimeout(timer);
  }, [children, speed, startDelay, onEnd]);

  useEffect(() => {
    const handleClick = () => {
      if (done) return;
      if (typeof onEnd === 'function') {
        calledEnd.current = true;
        setDone(true);
        onEnd();
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [done, onEnd]);

  if (done) {
    return <p className={cn(styles.typing, className)}>{children}</p>;
  }

  return (
    <p className={cn(styles.typing, className)}>
      {children.split('').map((char, i) => {
        if (char === '\n') return <br key={i} />;
        if (char === ' ') return <span key={i}> </span>;
        return (
          <span
            key={i}
            className={styles.letter}
            style={{
              animation: `${styles.fadeIn} ${speed}ms steps(1) ${
                startDelay + i * speed
              }ms forwards`,
            }}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
};
