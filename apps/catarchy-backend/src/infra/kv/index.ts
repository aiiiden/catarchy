let _kv: KVNamespace | null = null;

export const initKV = (kv: KVNamespace) => {
  if (_kv) return;
  _kv = kv;
};

export const getKV = (): KVNamespace => {
  if (!_kv) throw new Error("KV not initialized");
  return _kv;
};
