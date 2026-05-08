import type { ConsensusKey } from "./definitions";
import { ConsensusRepository } from "./repository";

export abstract class ConsensusService {
  static async getAll() {
    return ConsensusRepository.getAllValues();
  }

  static async getOne(key: ConsensusKey) {
    return ConsensusRepository.getValueWithMeta(key);
  }
}
