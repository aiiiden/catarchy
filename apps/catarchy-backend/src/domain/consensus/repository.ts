import { ConsensusValueType } from "@catarchy/shared/constants/consensus";
import { eq, inArray } from "drizzle-orm";

import { consensusCache } from "@/infra/cache";
import { getDatabase, table } from "@/infra/db";
import { NotFoundError } from "@/lib/error";

import {
  CONSENSUS_DEFINITIONS,
  type ConsensusKey,
  type ConsensusValue,
} from "./definitions";

type CachedEntry = {
  value: string;
  name: string;
  purpose: string;
};

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

async function getCached(key: ConsensusKey): Promise<CachedEntry | null> {
  const raw = await consensusCache.get(key);
  return raw ? (JSON.parse(raw) as CachedEntry) : null;
}

async function setCached(key: ConsensusKey, entry: CachedEntry) {
  await consensusCache.set(key, JSON.stringify(entry));
}

export abstract class ConsensusRepository {
  static async findAllValues() {
    return Promise.all(
      (Object.keys(CONSENSUS_DEFINITIONS) as ConsensusKey[]).map((key) =>
        this.findValueWithMeta(key),
      ),
    );
  }

  static async findValueWithMeta<K extends ConsensusKey>(key: K) {
    const valueType = CONSENSUS_DEFINITIONS[key];

    const cached = await getCached(key);
    if (cached) {
      return {
        key,
        value: parseValue(cached.value, valueType) as ConsensusValue<K>,
        name: cached.name,
        purpose: cached.purpose,
      };
    }

    const db = getDatabase();
    const [row] = await db
      .select({
        value: table.consensus.value,
        name: table.consensus.name,
        purpose: table.consensus.purpose,
      })
      .from(table.consensus)
      .where(eq(table.consensus.key, key))
      .limit(1);

    if (!row)
      throw new NotFoundError(`Consensus key "${key}" not found in database.`);

    await setCached(key, row);

    return {
      key,
      value: parseValue(row.value, valueType) as ConsensusValue<K>,
      name: row.name,
      purpose: row.purpose,
    };
  }

  static async findValues<const Keys extends ConsensusKey[]>(
    keys: Keys,
  ): Promise<{ [K in Keys[number]]: ConsensusValue<K> }> {
    const cachedEntries = await Promise.all(
      keys.map(async (key) => ({ key, cached: await getCached(key) })),
    );

    const hits = new Map(
      cachedEntries
        .filter((e) => e.cached !== null)
        .map((e) => [e.key, e.cached!]),
    );

    const missingKeys = keys.filter((key) => !hits.has(key));

    if (missingKeys.length > 0) {
      const db = getDatabase();
      const rows = await db
        .select({
          key: table.consensus.key,
          value: table.consensus.value,
          name: table.consensus.name,
          purpose: table.consensus.purpose,
        })
        .from(table.consensus)
        .where(inArray(table.consensus.key, missingKeys));

      const rowMap = new Map(rows.map((r) => [r.key, r]));

      await Promise.all(
        missingKeys.map((key) => {
          const row = rowMap.get(key);
          if (!row) throw new NotFoundError(`Consensus key "${key}" not found in database.`);
          hits.set(key, row);
          return setCached(key as ConsensusKey, row);
        }),
      );
    }

    return Object.fromEntries(
      keys.map((key) => {
        const entry = hits.get(key)!;
        return [key, parseValue(entry.value, CONSENSUS_DEFINITIONS[key])];
      }),
    ) as { [K in Keys[number]]: ConsensusValue<K> };
  }

  static async findValue<K extends ConsensusKey>(
    key: K,
  ): Promise<ConsensusValue<K>> {
    const valueType = CONSENSUS_DEFINITIONS[key];

    const cached = await getCached(key);
    if (cached)
      return parseValue(cached.value, valueType) as ConsensusValue<K>;

    const db = getDatabase();
    const [row] = await db
      .select({
        value: table.consensus.value,
        name: table.consensus.name,
        purpose: table.consensus.purpose,
      })
      .from(table.consensus)
      .where(eq(table.consensus.key, key))
      .limit(1);

    if (!row)
      throw new NotFoundError(`Consensus key "${key}" not found in database.`);

    await setCached(key, row);

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

    const cached = await getCached(key);
    if (cached) await setCached(key, { ...cached, value: raw });
  }

  static async invalidate(key: ConsensusKey) {
    await consensusCache.delete(key);
  }
}
