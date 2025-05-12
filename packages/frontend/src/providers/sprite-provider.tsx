import { sprites } from '@/features/sprites/config';
import { JSX } from 'react';

export function SpriteProvider() {
  return (
    <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {Object.entries(sprites).map(([id, encoded]) => {
          const byteString = atob(encoded.rects);
          const bytes = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            bytes[i] = byteString.charCodeAt(i);
          }

          const elements: JSX.Element[] = [];
          for (let i = 0; i < bytes.length; i += 6) {
            const [x, y, w, h, colorIdx, alpha] = bytes.slice(i, i + 6);
            const fill = encoded.colors[colorIdx];

            elements.push(
              <rect
                key={i}
                x={x}
                y={y}
                width={w}
                height={h}
                fill={fill}
                fillOpacity={alpha}
              />,
            );
          }

          return (
            <symbol
              key={id}
              id={id}
              viewBox={`0 0 ${encoded.width} ${encoded.height}`}
            >
              {elements}
            </symbol>
          );
        })}
      </defs>
    </svg>
  );
}
