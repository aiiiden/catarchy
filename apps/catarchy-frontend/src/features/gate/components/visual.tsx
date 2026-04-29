import { CatCharacter } from "@/features/cat";
import { cn } from "@/features/common";
import Background from "../assets/gate-background.png";
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
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <CatCharacter tag="walk" age="adult" />
        </div>
      </div>
    </div>
  );
}
