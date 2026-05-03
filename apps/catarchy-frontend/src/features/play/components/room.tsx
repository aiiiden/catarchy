import { CatCharacter } from "@/features/cat";
import { BubbleHint, Text } from "@/features/common";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./room.module.css";

const ROOM_W = 286; // w-71.5 × 4px
const ROOM_H = 200; // h-50 × 4px
const CAT_SIZE = 64; // 32 × 2
const SPEED = 90; // px/sec (walking)
const JUMP_HEIGHT = 140; // px
const JUMP_DURATION = 920; // ms — controls gravity via physics
const DEFAULT_JUMP_INTERVAL_MIN = 4000; // ms
const DEFAULT_JUMP_INTERVAL_MAX = 20000; // ms
// derived: g = 8h / T² (symmetric parabola, peak at T/2)
const GRAVITY = (8 * JUMP_HEIGHT) / (JUMP_DURATION / 1000) ** 2;
const GROUND_Y = ROOM_H - CAT_SIZE;

interface RoomProps {
  jumpIntervalMin?: number;
  jumpIntervalMax?: number;
}

export function Room({
  jumpIntervalMin = DEFAULT_JUMP_INTERVAL_MIN,
  jumpIntervalMax = DEFAULT_JUMP_INTERVAL_MAX,
}: RoomProps = {}) {
  const [isMoving, setIsMoving] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  const jumpIntervalMinRef = useRef(jumpIntervalMin);
  const jumpIntervalMaxRef = useRef(jumpIntervalMax);
  jumpIntervalMinRef.current = jumpIntervalMin;
  jumpIntervalMaxRef.current = jumpIntervalMax;

  const catDivRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: (ROOM_W - CAT_SIZE) / 2, y: GROUND_Y });
  const facingLeftRef = useRef(true);
  const velRef = useRef({ x: 0, y: 0 });
  const isJumpingRef = useRef(false);
  const jumpCountRef = useRef(0);
  const targetXRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const applyTransform = useCallback((x: number, y: number, fl: boolean) => {
    const el = catDivRef.current;
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `scaleX(${fl ? 1 : -1})`;
  }, []);

  const scheduleNewTarget = useCallback(() => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(
      () => {
        targetXRef.current = Math.random() * (ROOM_W - CAT_SIZE);
      },
      400 + Math.random() * 1800,
    );
  }, []);

  const triggerJump = useCallback(() => {
    if (jumpCountRef.current >= 2) return;

    const currX = posRef.current.x;
    const targetX = targetXRef.current;
    const vy = -Math.sqrt(2 * GRAVITY * JUMP_HEIGHT);
    // first jump: direction from walk target / second jump (airborne): carry current horizontal direction
    const vx =
      targetX !== null
        ? Math.sign(targetX - currX) * SPEED
        : velRef.current.x !== 0
          ? Math.sign(velRef.current.x) * SPEED
          : 0;

    velRef.current = { x: vx, y: vy };
    jumpCountRef.current += 1;
    isJumpingRef.current = true;
    targetXRef.current = null;
    setIsMoving(false);
    setIsJumping(true);
    if (vx !== 0) {
      facingLeftRef.current = vx < 0;
      applyTransform(posRef.current.x, posRef.current.y, facingLeftRef.current);
    }
  }, [applyTransform]);

  const scheduleRandomJump = useCallback(() => {
    clearTimeout(jumpTimerRef.current);
    jumpTimerRef.current = setTimeout(
      () => {
        triggerJump();
        scheduleRandomJump();
      },
      jumpIntervalMinRef.current +
        Math.random() *
          (jumpIntervalMaxRef.current - jumpIntervalMinRef.current),
    );
  }, [triggerJump]);

  useEffect(() => {
    applyTransform(posRef.current.x, posRef.current.y, facingLeftRef.current);
    scheduleNewTarget();
    scheduleRandomJump();

    function tick(time: number) {
      const dt = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 1000, 0.05)
        : 0;
      lastTimeRef.current = time;

      if (isJumpingRef.current) {
        velRef.current.y += GRAVITY * dt;
        let nx = posRef.current.x + velRef.current.x * dt;
        const ny = posRef.current.y + velRef.current.y * dt;

        // bounce off walls
        if (nx < 0) {
          nx = 0;
          velRef.current.x = Math.abs(velRef.current.x);
          facingLeftRef.current = false;
        } else if (nx > ROOM_W - CAT_SIZE) {
          nx = ROOM_W - CAT_SIZE;
          velRef.current.x = -Math.abs(velRef.current.x);
          facingLeftRef.current = true;
        }

        if (ny >= GROUND_Y) {
          posRef.current = { x: nx, y: GROUND_Y };
          velRef.current = { x: 0, y: 0 };
          isJumpingRef.current = false;
          jumpCountRef.current = 0;
          applyTransform(nx, GROUND_Y, facingLeftRef.current);
          setIsJumping(false);
          scheduleNewTarget();
        } else {
          posRef.current = { x: nx, y: ny };
          applyTransform(nx, ny, facingLeftRef.current);
        }
      } else {
        const targetX = targetXRef.current;
        if (targetX !== null) {
          const curr = posRef.current;
          const dx = targetX - curr.x;
          const dist = Math.abs(dx);

          if (dist < 1) {
            targetXRef.current = null;
            setIsMoving(false);
            scheduleNewTarget();
          } else {
            const move = Math.min(SPEED * dt, dist);
            const nx = curr.x + Math.sign(dx) * move;
            const fl = dx < 0;
            posRef.current = { x: nx, y: GROUND_Y };
            facingLeftRef.current = fl;
            applyTransform(nx, GROUND_Y, fl);
            setIsMoving(true);
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimerRef.current);
      clearTimeout(jumpTimerRef.current);
    };
  }, [scheduleNewTarget, scheduleRandomJump, applyTransform]);

  const handleClick = useCallback(() => {
    triggerJump();
  }, [triggerJump]);

  return (
    <div className={styles.room} onClick={handleClick}>
      <div ref={catDivRef} style={{ position: "absolute" }}>
        <CatCharacter
          ref={characterRef}
          age="adult"
          tag={isMoving || isJumping ? "walk" : "default"}
        />
      </div>
      <BubbleHint targetRef={characterRef} preferredSide="top" offset={-20}>
        <Text>:3</Text>
      </BubbleHint>
    </div>
  );
}
