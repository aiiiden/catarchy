import { Button, cn, Sprite } from "@/features/common";
import KnobImage from "../assets/knob.svg?react";
import noteKeyframes from "../assets/sprites/note.json";
import noteTexture from "../assets/sprites/note.svg";
import styles from "./sound-knob.module.css";

export function SoundKnob({
  className,
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <Button native className={cn(styles.root, className)} onClick={onClick}>
      <KnobImage width={24} height={48} />
      <Sprite
        className={styles.sprite}
        texture={noteTexture}
        width={12}
        height={12}
        tag={"note"}
        keyframes={noteKeyframes}
      />
    </Button>
  );
}
