let _rateLimiter: RateLimit | null = null;

export const initRateLimit = (rl: RateLimit) => {
  if (_rateLimiter) return;
  _rateLimiter = rl;
};

// Falls back to a no-op stub in local dev (bun run dev)
export const getRateLimit = (): RateLimit => {
  if (!_rateLimiter) {
    return { limit: async () => ({ success: true }) };
  }
  return _rateLimiter;
};
