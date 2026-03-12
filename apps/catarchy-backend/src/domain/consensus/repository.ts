import { eq } from "drizzle-orm";
import { getDatabase, table } from "../../infra/db";
import { ConsensusValueType } from "../../infra/db/schema";
import { getKV } from "../../infra/kv";
import { NotFoundError } from "../../lib/error";
import {
  CONSENSUS_DEFINITIONS,
  type ConsensusKey,
  type ConsensusValue,
} from "./definitions";

const KV_PREFIX = "consensus:";
const KV_TTL_SECONDS = 60 * 60; // 1 hour

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
    const kv = getKV();
    const valueType = CONSENSUS_DEFINITIONS[key];

    const cached = await kv.get(KV_PREFIX + key);
    if (cached !== null)
      return parseValue(cached, valueType) as ConsensusValue<K>;

    // KV miss → D1 fallback
    const db = getDatabase();
    const [row] = await db
      .select({ value: table.consensus.value })
      .from(table.consensus)
      .where(eq(table.consensus.key, key))
      .limit(1);

    if (!row)
      throw new NotFoundError(`Consensus key "${key}" not found in database.`);

    await kv.put(KV_PREFIX + key, row.value, { expirationTtl: KV_TTL_SECONDS });
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

    // KV도 즉시 반영
    await getKV().put(KV_PREFIX + key, raw, { expirationTtl: KV_TTL_SECONDS });
  }

  static async invalidate(key: ConsensusKey) {
    await getKV().delete(KV_PREFIX + key);
  }
}
