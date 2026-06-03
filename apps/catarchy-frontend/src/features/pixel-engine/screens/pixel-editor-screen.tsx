import { useEffect, useState } from "react";

import { Button, HeaderBackButton, Scaffold } from "@/features/common";

import { Canvas, Pixel, Selection, SelectionCell } from "../components/canvas";
import { Dpad } from "../components/dpad";
import styles from "./pixel-editor-screen.module.css";

const WIDTH = 32;
const HEIGHT = 32;

const STORAGE_KEY = "pixel-engine-pixels";

const EMPTY_PIXELS: Pixel[][] = Array(HEIGHT)
  .fill(null)
  .map(() => Array<Pixel>(WIDTH).fill({ color: "empty" }));

function loadPixels(): Pixel[][] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Pixel[][];
  } catch {
    // ignore parse errors
  }
  return EMPTY_PIXELS;
}

const COLORS: Pixel["color"][] = ["ink", "paper", "empty"];

type DrawMode = "draw" | "fill" | "move";

function floodFill(
  pixels: Pixel[][],
  x: number,
  y: number,
  targetColor: Pixel["color"],
  fillColor: Pixel["color"],
): Pixel[][] {
  if (targetColor === fillColor) return pixels;
  const next = pixels.map((row) => [...row]);
  const queue: [number, number][] = [[x, y]];
  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    if (cx < 0 || cx >= WIDTH || cy < 0 || cy >= HEIGHT) continue;
    if (next[cy][cx].color !== targetColor) continue;
    next[cy][cx] = { color: fillColor };
    queue.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
  return next;
}

function clampOffset(
  cells: SelectionCell[],
  dx: number,
  dy: number,
): { dx: number; dy: number } {
  const minX = Math.min(...cells.map((c) => c.x));
  const maxX = Math.max(...cells.map((c) => c.x));
  const minY = Math.min(...cells.map((c) => c.y));
  const maxY = Math.max(...cells.map((c) => c.y));
  return {
    dx: Math.max(-minX, Math.min(WIDTH - 1 - maxX, dx)),
    dy: Math.max(-minY, Math.min(HEIGHT - 1 - maxY, dy)),
  };
}

function floodSelect(
  pixels: Pixel[][],
  x: number,
  y: number,
): { cells: SelectionCell[]; newPixels: Pixel[][] } {
  if (pixels[y][x].color === "empty") return { cells: [], newPixels: pixels };
  const next = pixels.map((row) => [...row]);
  const cells: SelectionCell[] = [];
  const queue: [number, number][] = [[x, y]];
  const visited = new Set<string>();
  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    const key = `${cx},${cy}`;
    if (visited.has(key)) continue;
    if (cx < 0 || cx >= WIDTH || cy < 0 || cy >= HEIGHT) continue;
    if (next[cy][cx].color === "empty") continue;
    visited.add(key);
    cells.push({ x: cx, y: cy, color: next[cy][cx].color });
    next[cy][cx] = { color: "empty" };
    queue.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
  return { cells, newPixels: next };
}

export function PixelEditorScreen() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState<Pixel["color"]>("ink");
  const [mode, setMode] = useState<DrawMode>("draw");
  const [pixels, setPixels] = useState<Pixel[][]>(loadPixels);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pixels));
  }, [pixels]);
  const [selection, setSelection] = useState<Selection | null>(null);

  const move = (dx: number, dy: number) => {
    if (mode === "move" && selection) {
      setSelection(
        (s) => s && { ...s, ...clampOffset(s.cells, s.dx + dx, s.dy + dy) },
      );
    } else {
      setCursor((prev) => ({
        x: Math.max(0, Math.min(WIDTH - 1, prev.x + dx)),
        y: Math.max(0, Math.min(HEIGHT - 1, prev.y + dy)),
      }));
    }
  };

  const paint = () => {
    if (mode === "draw") {
      setPixels((prev) =>
        prev.map((row, y) =>
          row.map((pixel, x) =>
            x === cursor.x && y === cursor.y ? { color: selectedColor } : pixel,
          ),
        ),
      );
    } else if (mode === "fill") {
      setPixels((prev) => {
        const targetColor = prev[cursor.y][cursor.x].color;
        return floodFill(prev, cursor.x, cursor.y, targetColor, selectedColor);
      });
    } else if (mode === "move") {
      if (!selection) {
        // 선택
        setPixels((prev) => {
          const { cells, newPixels } = floodSelect(prev, cursor.x, cursor.y);
          if (cells.length > 0) setSelection({ cells, dx: 0, dy: 0 });
          return newPixels;
        });
      } else {
        commitSelection(selection);
      }
    }
  };

  const commitSelection = (sel: Selection | null) => {
    if (!sel) return;
    setPixels((prev) => {
      const next = prev.map((row) => [...row]);
      for (const cell of sel.cells) {
        const px = cell.x + sel.dx;
        const py = cell.y + sel.dy;
        if (px >= 0 && px < WIDTH && py >= 0 && py < HEIGHT) {
          next[py][px] = { color: cell.color };
        }
      }
      return next;
    });
    setSelection(null);
  };

  const switchMode = (newMode: DrawMode) => {
    commitSelection(selection);
    setMode(newMode);
  };

  const reset = () => {
    setPixels(EMPTY_PIXELS);
    setSelection(null);
  };

  const handleTap = (x: number, y: number) => {
    setCursor({ x, y });
    if (mode === "move") {
      if (selection) {
        if (pixels[y][x].color === "empty") commitSelection(selection);
      } else {
        setPixels((prev) => {
          const { cells, newPixels } = floodSelect(prev, x, y);
          if (cells.length > 0) setSelection({ cells, dx: 0, dy: 0 });
          return newPixels;
        });
      }
    }
  };

  const handleDragEnd = (dx: number, dy: number) => {
    if (mode !== "move") return;
    setSelection((s) => (s ? { ...s, dx, dy } : null));
  };

  return (
    <Scaffold>
      <Scaffold.Header title="Editor" left={<HeaderBackButton />} />
      <Scaffold.Body className={styles.body}>
        <div className="no-invert">
          <Canvas
            size={{ width: WIDTH, height: HEIGHT }}
            pixels={pixels}
            cursor={selection ? undefined : cursor}
            selection={selection ?? undefined}
            onTap={handleTap}
            onDragEnd={handleDragEnd}
          />
        </div>

        <div className={styles.toolbar}>
          <Button
            size="small"
            variant={mode === "draw" ? "primary" : "outline"}
            onClick={() => switchMode("draw")}
          >
            ✏ Draw
          </Button>
          <Button
            size="small"
            variant={mode === "fill" ? "primary" : "outline"}
            onClick={() => switchMode("fill")}
          >
            ◈ Fill
          </Button>
          <Button
            size="small"
            variant={mode === "move" ? "primary" : "outline"}
            onClick={() => switchMode("move")}
          >
            ⊹ Move
          </Button>
          <Button size="small" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>

        <div className={styles.controls}>
          <div className={styles.colorSection}>
            <div className={`${styles.colorPicker} no-invert`}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`${styles.colorChip} ${selectedColor === color ? styles.colorChipActive : ""}`}
                  data-color={color}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className={styles.dpadWrapper}>
            <Dpad
              onUp={() => move(0, -1)}
              onDown={() => move(0, 1)}
              onLeft={() => move(-1, 0)}
              onRight={() => move(1, 0)}
              onCenter={paint}
              paintColor={selectedColor}
            />
          </div>
        </div>
      </Scaffold.Body>
    </Scaffold>
  );
}
