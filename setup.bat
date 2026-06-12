@echo off
echo === Telegram Digital Store Setup ===
echo.

if "%BOT_TOKEN%"=="" (
  if exist .env (
    echo Found .env file
  ) else (
    echo ERROR: BOT_TOKEN not set and no .env file found.
    echo Create a .env file with:
    echo   BOT_TOKEN=8819153322:AAEBuXF6hmyzqFR_PxmlluoHh1PPp0WD-rk
    echo   DATABASE_URL=postgresql://...
    pause
    exit /b 1
  )
)

echo 1/5 Installing dependencies...
call npm install --no-audit --no-fund
if %errorlevel% neq 0 (
  echo npm install failed. Make sure you have internet access.
  pause
  exit /b 1
)

echo 2/5 Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
  echo Prisma generate failed.
  pause
  exit /b 1
)

echo 3/5 Pushing database schema...
call npx prisma db push
if %errorlevel% neq 0 (
  echo Database push failed. Check your DATABASE_URL.
  pause
  exit /b 1
)

echo 4/5 Seeding data (8 categories, 30 products)...
call node scripts/seed.mjs
if %errorlevel% neq 0 (
  echo Seeding failed.
  pause
  exit /b 1
)

echo 5/5 Setting up Telegram webhook...
echo.
echo After deploying to Vercel, set your webhook:
echo   https://api.telegram.org/bot%%BOT_TOKEN%%/setWebhook?url=https://YOUR_DOMAIN.vercel.app/api/webhook
echo.

echo === Setup complete! ===
echo Run: npm run dev
echo.
pause
