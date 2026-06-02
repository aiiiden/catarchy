type CacheAdapter = {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
  delete(key: string): Promise<void>;
};

let _kv: KVNamespace | null = null;

export function initKV(kv: KVNamespace) {
  if (_kv) return;
  _kv = kv;
}

// Falls back to in-memory store in local dev (bun run dev / no KV binding)
function getAdapter(): CacheAdapter {
  if (_kv) return _kv as unknown as CacheAdapter;
  return memAdapter;
}

const memStore = new Map<string, string>();
const memAdapter: CacheAdapter = {
  get: async (key) => memStore.get(key) ?? null,
  put: async (key, value) => {
    memStore.set(key, value);
  },
  delete: async (key) => {
    memStore.delete(key);
  },
};

type StoreOptions = {
  ttlSeconds?: number;
};

function createStore(prefix: string, options: StoreOptions = {}) {
  const { ttlSeconds } = options;
  return {
    get: (key: string) => getAdapter().get(prefix + key),
    set: (key: string, value: string) =>
      getAdapter().put(
        prefix + key,
        value,
        ttlSeconds ? { expirationTtl: ttlSeconds } : undefined,
      ),
    delete: (key: string) => getAdapter().delete(prefix + key),
  };
}

export const consensusCache = createStore("consensus:", {
  ttlSeconds: 2 * 60 * 60,
});
