import { ConsensusValueType } from "../../infra/db/schema";

export const CONSENSUS_DEFINITIONS = {
  "CAT.COOLDOWN_HOUR_BETWEEN_CARE": ConsensusValueType.NUMBER,
  "CAT.GROWTH_PER_CARE": ConsensusValueType.NUMBER,
  "CAT.EMOTION_PER_CARE": ConsensusValueType.NUMBER,
  "CAT.EMOTION_DECAY_PER_DAY": ConsensusValueType.NUMBER,
  "CAT.MAX_GROWTH": ConsensusValueType.NUMBER,
} as const;

export type ConsensusKey = keyof typeof CONSENSUS_DEFINITIONS;

type ValueTypeMap = {
  [ConsensusValueType.NUMBER]: number;
  [ConsensusValueType.STRING]: string;
  [ConsensusValueType.BOOLEAN]: boolean;
};

export type ConsensusValue<K extends ConsensusKey> =
  ValueTypeMap[(typeof CONSENSUS_DEFINITIONS)[K]];
