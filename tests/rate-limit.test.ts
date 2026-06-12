import { describe, it, expect } from 'vitest';

describe('RateLimiter', () => {
  it('allows requests within limit', () => {
    const { checkRateLimit } = require('@/lib/rate-limit');
    const result = checkRateLimit('test-key', 3, 60000);
    expect(result.allowed).toBe(true);
  });

  it('blocks requests over limit', () => {
    const { checkRateLimit } = require('@/lib/rate-limit');
    const key = `block-key-${Date.now()}`;
    checkRateLimit(key, 2, 60000);
    checkRateLimit(key, 2, 60000);
    const result = checkRateLimit(key, 2, 60000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeDefined();
  });
});
