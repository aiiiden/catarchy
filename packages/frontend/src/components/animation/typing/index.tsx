import { useEffect, useState, useRef } from 'react';
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
  cursor = '|',
  onEnd,
}: TypingProps) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const endCalled = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (charIdx < children.length) {
      const t = setTimeout(() => {
        setDisplayed(children.slice(0, charIdx + 1));
        setCharIdx((i) => i + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [started, charIdx, speed, children]);

  useEffect(() => {
    if (
      started &&
      charIdx === children.length &&
      !endCalled.current &&
      typeof onEnd === 'function'
    ) {
      endCalled.current = true;
      onEnd();
    }
  }, [started, charIdx, children.length, onEnd]);

  return (
    <p className="inline-block">
      {displayed}
      {charIdx < children.length && (
        <span className={styles.cursor}>{cursor}</span>
      )}
    </p>
  );
};
