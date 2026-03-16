import { cn } from "@/shared/lib/cn";

const css = /* css */ `
@keyframes skeleton-pulse {
  0%   { background-image: var(--background-image-gradient-mono-1); }
  7%   { background-image: var(--background-image-gradient-mono-2); }
  14%  { background-image: var(--background-image-gradient-mono-3); }
  21%  { background-image: var(--background-image-gradient-mono-4); }
  28%  { background-image: var(--background-image-gradient-mono-5); }
  35%  { background-image: var(--background-image-gradient-mono-6); }
  42%  { background-image: var(--background-image-gradient-mono-7); }
  50%  { background-image: var(--background-image-gradient-mono-8); }
  57%  { background-image: var(--background-image-gradient-mono-7); }
  64%  { background-image: var(--background-image-gradient-mono-6); }
  71%  { background-image: var(--background-image-gradient-mono-5); }
  78%  { background-image: var(--background-image-gradient-mono-4); }
  85%  { background-image: var(--background-image-gradient-mono-3); }
  92%  { background-image: var(--background-image-gradient-mono-2); }
  100% { background-image: var(--background-image-gradient-mono-1); }
}
.skeleton-pulse {
  animation: skeleton-pulse 2s steps(1, end) infinite;
}
`;

export function Skeleton({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <>
      <style scoped>{css}</style>
      <div className={cn("skeleton-pulse h-4 w-12", className)} style={style} />
    </>
  );
}
