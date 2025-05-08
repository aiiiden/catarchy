import { useEffect, useRef, useState } from 'react';
import styles from './typing.module.css';

interface TypingProps {
  children: string;
  speed?: number;
  startDelay?: number;
  cursor?: string;
  onEnd?: () => void;
}

export const Typing = ({
  children,
  speed = 80,
  startDelay = 0,
  onEnd,
}: TypingProps) => {
  const [done, setDone] = useState(false);
  const calledEnd = useRef(false);

  // 1) onEnd + done 호출 타이머
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

  // 2) 애니메이션이 끝나면 그냥 문자열 렌더
  if (done) {
    return <p className={styles.typing}>{children}</p>;
  }

  return (
    <p className={styles.typing}>
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
