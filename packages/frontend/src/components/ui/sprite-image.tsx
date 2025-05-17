import { sprites } from '@/features/sprites/config';
import { cn } from '@/lib/classname';

export default function SpriteImage({
  id,
  className = '',
  width,
  height,
  alt,
  ref,
}: {
  id: keyof typeof sprites;
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  ref?: React.Ref<SVGSVGElement>;
}) {
  if (id in sprites === false) {
    throw new Error(`Sprite with id "${id}" not found`);
  }

  const sprite = sprites[id];

  if (id.startsWith('pattern/')) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cn('inline-block', className)}
        width={width ?? sprite.width}
        height={height ?? sprite.height}
        preserveAspectRatio="none"
      >
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt ?? id}
      className={cn('inline-block', className)}
      width={width ?? sprite.width}
      height={height ?? sprite.height}
    >
      <use href={`#${id}`} />
    </svg>
  );
}
