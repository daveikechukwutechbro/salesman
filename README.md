# Telegram Mini App With Stars Payments

<div align="center">
  <img src="https://nikandr.com/og-image.jpg" alt="Nikandr - Premium Telegram Development Resources" width="600"/>
  
  🚀 **Looking to master Telegram Mini App development?**  
  Visit [nikandr.com](https://nikandr.com) for the best premium content and courses for Telegram developers.
</div>

---

A complete full-stack example of a modern Telegram Mini App for selling digital products using Telegram Stars payments. Built with Next.js 15, TypeScript, Tailwind CSS, and Telegram Bot API, this app includes secure invoice generation, purchase history, secret content access after purchase, and refund processing via a Python companion bot. Ideal for Web3 developers, Telegram bot creators, and digital entrepreneurs looking to monetize through Telegram's payment ecosystem.

> **Note:** This application is designed to work exclusively within the Telegram ecosystem as a Telegram Mini App. It should be accessed only through Telegram and not directly via a web browser.

## Features

- 💸 Telegram Stars integration for payments
- 🔄 Purchase history tracking
- 📱 Responsive design optimized for Telegram WebApp
- 🔑 Secret code delivery for purchased digital items
- 🔄 Refund support via companion bot

## Prerequisites

- Node.js 18+ and npm
- A Telegram bot token (obtained from BotFather)
- Python 3.7+ (for the companion bot)
- Vercel account (for deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nikandr-surkov/telegram-mini-app-stars-payments.git
cd telegram-mini-app-stars-payments
npm install
```

### 2. Check there is no errors during the build

```bash
npm run build
```

> **Note:** The app will only function correctly when accessed through Telegram. 

### 3. Set up the Companion Bot
For the companion bot with refund capabilities, visit the separate repository:
[Python Telegram Bot with Stars Payment](https://github.com/nikandr-surkov/python-telegram-bot-with-stars-payment)

## Deployment
As this is a Telegram Mini App, it must be deployed and accessed through Telegram. Follow these steps:

1. Push your code to a GitHub repository
2. Sign up for a Vercel account if you haven't already
3. Connect your GitHub repository to Vercel and deploy the app
4. During deployment, add your `BOT_TOKEN` as an environment variable in the Vercel dashboard
5. Once deployed, Vercel will provide you with a URL for your app
6. Use this URL to set up your Telegram Mini App:
   - Go to [@BotFather](https://t.me/BotFather) on Telegram
   - Send the command `/newapp` or choose to edit an existing bot
   - Follow the prompts to set up your Mini App, using the Vercel URL as the Web App URL
7. Once set up, you can access your Mini App through Telegram on mobile devices or in the Web version of Telegram

## Project Structure
- `/app` - Next.js application
  - `/api` - API routes for invoice creation, payment processing, and purchase history
  - `/components` - React UI components (modals, cards, loaders, etc.)
  - `/data` - Shared item definitions and configurations
  - `/server` - Server-only code, including sensitive data like secret codes
  - `/types` - TypeScript type definitions and interfaces
  - `page.tsx` - Main application component
  - `layout.tsx` - Root layout component
  - `globals.css` - Global styles
- `/public` - Static assets

## How It Works

### Telegram Stars Payment Flow
1. User clicks "Buy" on a digital item
2. App creates an invoice through Telegram Bot API
3. Telegram shows the payment interface
4. User approves the payment with Stars
5. App receives a success callback and shows the secret code
6. Purchase is recorded in the history

### Refund Flow
1. User requests a refund through the companion Telegram bot
2. Bot processes the refund using Telegram's API
3. Stars are returned to the user's account

## Learn More
- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Bot API - Payments](https://core.telegram.org/bots/api#payments)
- [Next.js Documentation](https://nextjs.org/docs)


## Author
### Nikandr Surkov
- 🌐 Website: https://nikandr.com
- 📺 YouTube: https://www.youtube.com/@NikandrSurkov
- 📢 Telegram Channel: https://t.me/NikandrApps
- 📱 Telegram: https://t.me/nikandr_s
- 💻 GitHub: https://github.com/nikandr-surkov
- 🐦 Twitter: https://x.com/NikandrSurkov
- 💼 LinkedIn: https://www.linkedin.com/in/nikandr-surkov/
- ✍️ Medium: https://medium.com/@NikandrSurkov

---

Built with ❤️ for the Telegram developer community
