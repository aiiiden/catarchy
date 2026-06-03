import { Button } from "@/features/common";

import styles from "./dpad.module.css";

type PaintColor = "ink" | "paper" | "empty";

type DpadProps = {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onCenter?: () => void;
  paintColor?: PaintColor;
};

export function Dpad({ onUp, onDown, onLeft, onRight, onCenter, paintColor = "ink" }: DpadProps) {
  return (
    <div className={styles.dpad}>
      <div className={styles.up}>
        <Button icon variant="outline" onClick={onUp}>⬆</Button>
      </div>
      <div className={styles.left}>
        <Button icon variant="outline" onClick={onLeft}>⬅</Button>
      </div>
      <div className={styles.center}>
        <button className={styles.paintBtn} data-color={paintColor} onClick={onCenter}>
          ◉
        </button>
      </div>
      <div className={styles.right}>
        <Button icon variant="outline" onClick={onRight}>➡</Button>
      </div>
      <div className={styles.down}>
        <Button icon variant="outline" onClick={onDown}>⬇</Button>
      </div>
    </div>
  );
}
