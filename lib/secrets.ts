const DEFAULT_SECRETS: Record<string, string> = {
  'ice_cream': 'FROZEN2025',
  'cookie': 'SWEET2025',
  'hamburger': 'BURGER2025',
};

export function getSecretForItem(itemId: string): string {
  const customSecrets = process.env.ITEM_SECRETS;
  if (customSecrets) {
    try {
      const parsed = JSON.parse(customSecrets) as Record<string, string>;
      if (parsed[itemId]) {
        return parsed[itemId];
      }
    } catch {
    }
  }
  
  const secret = DEFAULT_SECRETS[itemId];
  if (!secret) {
    throw new Error(`No secret configured for item: ${itemId}`);
  }
  return secret;
}
