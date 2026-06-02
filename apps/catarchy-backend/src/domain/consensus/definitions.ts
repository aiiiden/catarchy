import {
  CONSENSUS_DEFINITIONS,
  type ConsensusKey,
  ConsensusValueType,
} from "@catarchy/shared/constants/consensus";

export { CONSENSUS_DEFINITIONS };
export type { ConsensusKey };

type ValueTypeMap = {
  [ConsensusValueType.NUMBER]: number;
  [ConsensusValueType.STRING]: string;
  [ConsensusValueType.BOOLEAN]: boolean;
};

export type ConsensusValue<K extends ConsensusKey> =
  ValueTypeMap[(typeof CONSENSUS_DEFINITIONS)[K]];
