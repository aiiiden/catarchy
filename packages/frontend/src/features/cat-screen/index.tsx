import { useEffect, useRef } from 'react';
import SpriteImage from '@/components/ui/sprite-image';

/**
 * <CatScreen> — animated cat with state‑driven sprite swapping
 * ------------------------------------------------------------
 * Sprite naming convention
 *   • idle  : cat/cat-${growth}
 *   • motion: cat/cat-${growth}-1 and cat/cat-${growth}-2 (alternating)
 *     (used for both walking and airborne movement)
 *
 * UX:
 *   • Click anywhere in the container to make the cat jump.
 */
export default function CatScreen({
  growth = 6,
}: {
  growth?: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  /* behaviour probabilities */
  const P_JUMP = 0.1;
  const P_WALK = 0.5;
  const P_STOP = 0.4;

  const containerRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cat = catRef.current;
    if (!container || !cat) return;

    // locate <use> inside <SpriteImage>
    const useEl: SVGUseElement | null = cat.querySelector('use');
    const setSprite = (id: string) => {
      if (!useEl) return;
      const href = `#${id}`;
      if (useEl.getAttribute('href') !== href) {
        useEl.setAttribute('href', href);
        useEl.setAttribute('xlink:href', href);
      }
    };

    /* -------------------------------------------------- constants */
    const GRAVITY = 0.2;
    const MAX_JUMP_HEIGHT = 120;
    const FRAME_INTERVAL = 200; // ms between motion frames

    /* -------------------------------------------------- helpers */
    const box = () => ({ w: container.clientWidth, h: container.clientHeight });

    /* -------------------------------------------------- mutable state */
    let x = 0,
      y = 0,
      vx = 0,
      vy = 0;
    let facingRight = true;
    type CatState = 'stop' | 'walk' | 'jump';
    let state: CatState = 'stop';

    // frame toggling for any motion (walk or air)
    let motionFrame = false;
    let lastFrameSwitch = performance.now();

    /* -------------------------------------------------- init position */
    const init = () => {
      const { w, h } = box();
      const cw = cat.clientWidth || 24;
      const ch = cat.clientHeight || 24;
      x = (w - cw) / 2;
      y = h - ch;
      cat.style.left = `${x}px`;
      cat.style.top = `${y}px`;
      setSprite(`cat/cat-${growth}`);
    };
    init();

    /* -------------------------------------------------- behaviour helpers */
    function triggerJump() {
      state = 'jump';
      vy = -6.5;
      vx = facingRight ? 2 : -2;
      motionFrame = false;
      setSprite(`cat/cat-${growth}-1`);
    }

    function chooseBehaviour() {
      // use all three probabilities explicitly
      const TOTAL = P_JUMP + P_WALK + P_STOP;
      const r = Math.random() * TOTAL;
      const jumpCutoff = P_JUMP;
      const walkCutoff = jumpCutoff + P_WALK;

      if (r < jumpCutoff) {
        return triggerJump();
      }
      if (r < walkCutoff) {
        state = 'walk';
        vx = facingRight ? 1.5 : -1.5;
        vy = 0;
        motionFrame = false;
        setSprite(`cat/cat-${growth}-1`);
      } else {
        state = 'stop';
        vx = vy = 0;
        motionFrame = false;
        setSprite(`cat/cat-${growth}`);
      }
    }

    /* -------------------------------------------------- click interaction */
    const handleClick = () => {
      if (state !== 'jump') triggerJump();
    };
    container.addEventListener('click', handleClick);

    /* -------------------------------------------------- RAF loop */
    let rafId: number;
    let lastDecision = performance.now();

    const update = () => {
      const { w: bw, h: bh } = box();
      const cw = cat.clientWidth || 24;
      const ch = cat.clientHeight || 24;

      // physics integration
      vy += GRAVITY;
      let nx = x + vx;
      let ny = y + vy;

      // wall collisions
      if (nx < 0 || nx > bw - cw) {
        vx = -vx;
        nx = Math.max(0, Math.min(nx, bw - cw));
        facingRight = vx >= 0;
      }

      // ceiling & floor
      if (ny < 0) {
        ny = 0;
        vy = 0;
      }
      if (ny > bh - ch) {
        ny = bh - ch;
        vy = 0;
        if (state === 'jump') {
          state = 'stop';
          motionFrame = false;
          setSprite(`cat/cat-${growth}`);
        }
      }

      // jump apex limiter
      if (state === 'jump' && vy < 0) {
        const takeOffY = y;
        if (ny < takeOffY - MAX_JUMP_HEIGHT) {
          ny = takeOffY - MAX_JUMP_HEIGHT;
          vy = 0;
        }
      }

      // commit style transforms
      x = nx;
      y = ny;
      cat.style.left = `${x}px`;
      cat.style.top = `${y}px`;
      cat.style.transform = `scaleX(${facingRight ? -1 : 1})`;

      const now = performance.now();

      // motion animation frame toggle (any active movement)
      if (state !== 'stop' && now - lastFrameSwitch > FRAME_INTERVAL) {
        motionFrame = !motionFrame;
        setSprite(`cat/cat-${growth}-${motionFrame ? 2 : 1}`);
        lastFrameSwitch = now;
      }

      // random behaviour / direction change
      if (now - lastDecision > 1000) {
        if (Math.random() < 0.02) {
          chooseBehaviour();
          lastDecision = now;
        }
        if (state !== 'stop') {
          if (Math.random() < 0.01) {
            facingRight = !facingRight;
            vx = -vx;
            lastDecision = now;
          }
        }
      }

      rafId = requestAnimationFrame(update);
    };

    chooseBehaviour();
    rafId = requestAnimationFrame(update);

    /* -------------------------------------------------- resize handler */
    const onResize = () => {
      const ch = cat.clientHeight || 24;
      const { h } = box();
      if (y > h - ch) y = h - ch;
    };
    window.addEventListener('resize', onResize);

    /* -------------------------------------------------- cleanup */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('click', handleClick);
    };
  }, [growth]);

  /* -------------------------------------------------- render */
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden cursor-pointer"
    >
      <SpriteImage
        ref={catRef}
        id={`cat/cat-${growth}`}
        className="absolute transition-transform duration-100"
        alt="🐈"
      />
    </div>
  );
}
