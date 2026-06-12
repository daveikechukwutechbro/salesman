const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!BOT_TOKEN) {
  console.error('Error: BOT_TOKEN environment variable is required');
  process.exit(1);
}

if (!WEBHOOK_URL) {
  console.error('Error: WEBHOOK_URL environment variable is required');
  console.error('Usage: BOT_TOKEN=xxx WEBHOOK_URL=https://your-domain.com/api/webhook node scripts/set-webhook.mjs');
  process.exit(1);
}

const response = await fetch(
  `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: `${WEBHOOK_URL}/api/webhook`,
    }),
  }
);

const data = await response.json();

if (data.ok) {
  console.log('Webhook set successfully!');
  console.log(`URL: ${WEBHOOK_URL}/api/webhook`);
} else {
  console.error('Failed to set webhook:', data.description);
  process.exit(1);
}
