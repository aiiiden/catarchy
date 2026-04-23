import { cn, Sprite } from "@/features/common";
import Background from "../assets/gate-background.png";
import keyframes from "../assets/sprites/cat.json";
import texture from "../assets/sprites/cat.svg";
import styles from "./visual.module.css";

export function Visual() {
  return (
    <div>
      <div className={cn(["overflow-hidden", styles.container])}>
        <img
          src={Background}
          alt="Gate Background"
          width={1024}
          height={258}
          className={cn([styles.background, styles.first])}
        />
        <img
          src={Background}
          alt="Gate Background"
          width={1024}
          height={258}
          className={cn([styles.background, styles.second])}
        />
        <Sprite
          texture={texture}
          tag={"walk"}
          width={32 * 2}
          height={32 * 2}
          keyframes={keyframes}
          className="absolute z-10 top-20 left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
