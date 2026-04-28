import { cn, Sprite } from "@/features/common";
import KnobImage from "../assets/knob.svg?react";
import noteKeyframes from "../assets/sprites/note.json";
import noteTexture from "../assets/sprites/note.svg";
export function SoundKnob({
  className,
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  return (
    <button className={cn(["w-6 h-12 relative", className])} onClick={onClick}>
      <KnobImage width={24} height={48} />
      <Sprite
        className="absolute top-1/2 left-1.75 -translate-y-1/2"
        texture={noteTexture}
        width={12}
        height={12}
        tag={"note"}
        keyframes={noteKeyframes}
      />
    </button>
  );
}
