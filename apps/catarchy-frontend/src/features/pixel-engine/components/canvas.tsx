import { useRef } from "react";

import styles from "./canvas.module.css";

export type Pixel = { color: "ink" | "paper" | "empty" };

export type SelectionCell = { x: number; y: number; color: Pixel["color"] };

export type Selection = {
  cells: SelectionCell[];
  dx: number;
  dy: number;
};

function CanvasPixel({ color }: Pixel) {
  return <div role="button" className={styles.pixel} data-color={color} />;
}

function CanvasRow({ pixels }: { pixels: Pixel[] }) {
  return (
    <div className={styles.row}>
      {pixels.map((pixel, x) => (
        <CanvasPixel key={x} {...pixel} />
      ))}
    </div>
  );
}

function clampDxDy(
  cells: SelectionCell[],
  dx: number,
  dy: number,
  width: number,
  height: number,
) {
  const minX = Math.min(...cells.map((c) => c.x));
  const maxX = Math.max(...cells.map((c) => c.x));
  const minY = Math.min(...cells.map((c) => c.y));
  const maxY = Math.max(...cells.map((c) => c.y));
  return {
    dx: Math.max(-minX, Math.min(width - 1 - maxX, dx)),
    dy: Math.max(-minY, Math.min(height - 1 - maxY, dy)),
  };
}

export function Canvas({
  size,
  pixels,
  cursor,
  selection,
  onDragEnd,
  onTap,
}: {
  size: { width: number; height: number };
  pixels: Pixel[][];
  cursor?: { x: number; y: number };
  selection?: Selection;
  onDragEnd?: (dx: number, dy: number) => void;
  onTap?: (x: number, y: number) => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; baseDx: number; baseDy: number } | null>(null);
  const currentDragRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const justTouchedRef = useRef(false);

  const pixelCoordsFromClient = (clientX: number, clientY: number) => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const pixelSize = rect.width / size.width;
    const x = Math.floor((clientX - rect.left) / pixelSize);
    const y = Math.floor((clientY - rect.top) / pixelSize);
    if (x < 0 || x >= size.width || y < 0 || y >= size.height) return null;
    return { x, y };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      baseDx: selection?.dx ?? 0,
      baseDy: selection?.dy ?? 0,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || !canvasRef.current || !selectionRef.current || !selection) return;
    const touch = e.touches[0];
    const pixelSize = canvasRef.current.clientWidth / size.width;
    const rawDx = touchStartRef.current.baseDx + Math.floor((touch.clientX - touchStartRef.current.x) / pixelSize);
    const rawDy = touchStartRef.current.baseDy + Math.floor((touch.clientY - touchStartRef.current.y) / pixelSize);
    const { dx, dy } = clampDxDy(selection.cells, rawDx, rawDy, size.width, size.height);
    currentDragRef.current = { dx, dy };
    // 직접 DOM 조작 — React 리렌더 없음
    selectionRef.current.style.transform = `translate(${dx * pixelSize}px, ${dy * pixelSize}px)`;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current) {
      const touch = e.changedTouches[0];
      const isTap =
        Math.abs(touch.clientX - touchStartRef.current.x) < 10 &&
        Math.abs(touch.clientY - touchStartRef.current.y) < 10;

      if (isTap) {
        justTouchedRef.current = true;
        const coords = pixelCoordsFromClient(touch.clientX, touch.clientY);
        if (coords) onTap?.(coords.x, coords.y);
      } else if (selection && selectionRef.current) {
        // 드래그 종료: state commit
        onDragEnd?.(currentDragRef.current.dx, currentDragRef.current.dy);
      }
    }
    touchStartRef.current = null;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (justTouchedRef.current) {
      justTouchedRef.current = false;
      return;
    }
    const coords = pixelCoordsFromClient(e.clientX, e.clientY);
    if (coords) onTap?.(coords.x, coords.y);
  };

  // selection.dx/dy가 React 상태로 바뀔 때 (D패드 이동) transform 동기화
  if (selectionRef.current && selection && canvasRef.current) {
    const pixelSize = canvasRef.current.clientWidth / size.width;
    selectionRef.current.style.transform = `translate(${selection.dx * pixelSize}px, ${selection.dy * pixelSize}px)`;
  }

  return (
    <div className={styles.container}>
      <div
        ref={canvasRef}
        className={styles.canvas}
        style={
          {
            aspectRatio: `${size.width} / ${size.height}`,
            "--cols": size.width,
            "--rows": size.height,
          } as React.CSSProperties
        }
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <div
          className={styles.layer}
          style={{ gridTemplateRows: `repeat(${size.height}, 1fr)` }}
        >
          {pixels.map((row, y) => (
            <CanvasRow key={y} pixels={row} />
          ))}
        </div>

        {selection && (
          <div ref={selectionRef} className={styles.selectionContainer}>
            {selection.cells.map((cell) => (
              <div
                key={`${cell.x}-${cell.y}`}
                className={styles.selectionCell}
                data-color={cell.color}
                style={{
                  left: `${(cell.x / size.width) * 100}%`,
                  top: `${(cell.y / size.height) * 100}%`,
                  width: `${100 / size.width}%`,
                  height: `${100 / size.height}%`,
                }}
              />
            ))}
          </div>
        )}

        {cursor && (
          <div
            className={styles.cursor}
            style={
              {
                "--cursor-x": cursor.x,
                "--cursor-y": cursor.y,
              } as React.CSSProperties
            }
          />
        )}
      </div>
    </div>
  );
}
