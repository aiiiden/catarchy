import { cn } from "@/shared/lib/cn";
import Bastet from "../assets/bastet.svg?react";

const css = /* css */ `

@keyframes retro-bounce {
  0%   { transform: translateY(0px); }
  12%  { transform: translateY(-3px); }
  25%  { transform: translateY(-6px); }
  37%  { transform: translateY(-8px); }
  50%  { transform: translateY(-8px); }
  63%  { transform: translateY(-7px); }
  75%  { transform: translateY(-6px); }
  87%  { transform: translateY(-3px); }
  100% { transform: translateY(0px); }
}
.retro-bounce {
  animation: retro-bounce 1.2s steps(1, end) infinite;
}
`;

export function GlobalLoading({ loadingMessage }: { loadingMessage?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-99 flex flex-col items-center justify-center gap-4 bg-white opacity-100",
      )}
    >
      <style scoped>{css}</style>
      <Bastet width={72} height={56} className="retro-bounce" />
      <p>{loadingMessage || "Loading"}</p>
    </div>
  );
}
