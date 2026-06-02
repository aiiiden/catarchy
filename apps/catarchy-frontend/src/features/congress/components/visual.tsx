import VisualImage from "../assets/visual.svg?react";
import styles from "./visual.module.css";

export function Visual() {
  return (
    <div className={styles.container}>
      <VisualImage width={384} height={160} />
    </div>
  );
}
