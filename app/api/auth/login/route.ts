import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyTelegramInitData } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json({ error: 'Missing initData' }, { status: 400 });
    }

    const { userId: telegramId, valid } = verifyTelegramInitData(initData);
    if (!valid || !telegramId) {
      return NextResponse.json({ error: 'Invalid Telegram session' }, { status: 401 });
    }

    let user = await prisma.user.findUnique({ where: { telegramId } });

    if (!user) {
      const urlParams = new URLSearchParams(initData);
      const userStr = urlParams.get('user');
      const tgUser = userStr ? JSON.parse(userStr) : {};

      user = await prisma.user.create({
        data: {
          telegramId,
          firstName: tgUser.first_name || null,
          lastName: tgUser.last_name || null,
          username: tgUser.username || null,
        },
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
