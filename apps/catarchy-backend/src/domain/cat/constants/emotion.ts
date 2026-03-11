export enum EmotionLevel {
  Depressed = "depressed",
  Down = "down",
  Meh = "meh",
  Happy = "happy",
}

export const EMOTION_THRESHOLDS = {
  DOWN: 40,
  MEH: 70,
  HAPPY: 90,
} as const;

export const EMOTION_EMOJIS = {
  [EmotionLevel.Depressed]: "😩",
  [EmotionLevel.Down]: "🙁",
  [EmotionLevel.Meh]: "😐",
  [EmotionLevel.Happy]: "😄",
} as const;

export function getEmotion(emotion: number) {
  let level: EmotionLevel;

  if (emotion < EMOTION_THRESHOLDS.DOWN) {
    level = EmotionLevel.Depressed;
  } else if (emotion < EMOTION_THRESHOLDS.MEH) {
    level = EmotionLevel.Down;
  } else if (emotion < EMOTION_THRESHOLDS.HAPPY) {
    level = EmotionLevel.Meh;
  } else {
    level = EmotionLevel.Happy;
  }

  return {
    level,
    emoji: EMOTION_EMOJIS[level],
  };
}
