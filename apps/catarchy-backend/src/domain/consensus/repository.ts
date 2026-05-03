import { eq } from "drizzle-orm";
import { getDatabase, table } from "../../infra/db";
import { ConsensusValueType } from "../../infra/db/schema";
import { cache } from "../../infra/cache";
import { NotFoundError } from "../../lib/error";
import {
  CONSENSUS_DEFINITIONS,
  type ConsensusKey,
  type ConsensusValue,
} from "./definitions";

const PREFIX = "consensus:";

function parseValue(
  raw: string,
  valueType: ConsensusValueType,
): string | number | boolean {
  switch (valueType) {
    case ConsensusValueType.NUMBER:
      return Number(raw);
    case ConsensusValueType.BOOLEAN:
      return raw === "true";
    default:
      return raw;
  }
}

export abstract class ConsensusRepository {
  static async getValue<K extends ConsensusKey>(
    key: K,
  ): Promise<ConsensusValue<K>> {
    const valueType = CONSENSUS_DEFINITIONS[key];

    const cacheKey = PREFIX + key;
    const cached = cache.get(cacheKey);
    if (cached !== undefined)
      return parseValue(cached, valueType) as ConsensusValue<K>;

    const db = getDatabase();
    const [row] = await db
      .select({ value: table.consensus.value })
      .from(table.consensus)
      .where(eq(table.consensus.key, key))
      .limit(1);

    if (!row)
      throw new NotFoundError(`Consensus key "${key}" not found in database.`);

    cache.set(cacheKey, row.value);
    return parseValue(row.value, valueType) as ConsensusValue<K>;
  }

  static async setValue<K extends ConsensusKey>(
    key: K,
    value: ConsensusValue<K>,
  ) {
    const db = getDatabase();
    const raw = String(value);

    await db
      .update(table.consensus)
      .set({ value: raw })
      .where(eq(table.consensus.key, key));

    cache.set(PREFIX + key, raw);
  }

  static invalidate(key: ConsensusKey) {
    cache.delete(PREFIX + key);
  }
}
