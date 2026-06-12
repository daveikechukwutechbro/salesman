import { describe, it, expect } from 'vitest';

const DEFAULT_SECRETS: Record<string, string> = {
  'ice_cream': 'FROZEN2025',
  'cookie': 'SWEET2025',
  'hamburger': 'BURGER2025',
};

function getSecretForItem(itemId: string): string {
  const secret = DEFAULT_SECRETS[itemId];
  if (!secret) {
    throw new Error(`No secret configured for item: ${itemId}`);
  }
  return secret;
}

describe('getSecretForItem', () => {
  it('returns secret for known items', () => {
    expect(getSecretForItem('ice_cream')).toBe('FROZEN2025');
    expect(getSecretForItem('cookie')).toBe('SWEET2025');
    expect(getSecretForItem('hamburger')).toBe('BURGER2025');
  });

  it('throws for unknown item', () => {
    expect(() => getSecretForItem('pizza')).toThrow('No secret configured');
  });
});
