export function validateEnv() {
  const required: string[] = ['BOT_TOKEN', 'DATABASE_URL'];
  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Create a .env file with:\n` +
      missing.map(k => `${k}=your_${k}_here`).join('\n')
    );
  }
}
