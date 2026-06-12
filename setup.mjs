import { execSync } from 'child_process';

const BOT_TOKEN = process.env.BOT_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;

if (!BOT_TOKEN || !DATABASE_URL) {
  console.error('Usage: BOT_TOKEN=your_token DATABASE_URL=your_postgres_url node setup.mjs');
  process.exit(1);
}

const steps = [
  { cmd: 'npm install', msg: 'Installing dependencies...' },
  { cmd: 'npx prisma generate', msg: 'Generating Prisma client...' },
  { cmd: 'npx prisma db push', msg: 'Pushing database schema...' },
  { cmd: 'node scripts/set-webhook.mjs', msg: 'Setting Telegram webhook...' },
];

for (const step of steps) {
  console.log(`\n=== ${step.msg} ===`);
  try {
    execSync(step.cmd, { stdio: 'inherit', cwd: __dirname });
    console.log('Done.');
  } catch (e) {
    console.error(`Failed: ${step.cmd}`);
    process.exit(1);
  }
}

console.log('\n=== Setup complete! ===');
console.log('Run `npm run dev` to start the app.');
