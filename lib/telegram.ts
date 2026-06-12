import crypto from 'crypto';

const BOT_TOKEN = () => {
  const token = process.env.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN environment variable is not set');
  }
  return token;
};

export function verifyTelegramInitData(initData: string): { userId: string; valid: boolean } {
  try {
    const token = BOT_TOKEN();
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) {
      return { userId: '', valid: false };
    }

    urlParams.delete('hash');
    const sortedParams = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(token)
      .digest();

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(sortedParams)
      .digest('hex');

    const userStr = urlParams.get('user');
    if (!userStr) {
      return { userId: '', valid: false };
    }

    const user = JSON.parse(userStr);
    
    return {
      userId: user.id?.toString() || '',
      valid: computedHash === hash,
    };
  } catch {
    return { userId: '', valid: false };
  }
}
