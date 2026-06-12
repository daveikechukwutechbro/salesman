import { NextRequest, NextResponse } from 'next/server';
import { verifyTelegramInitData } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const result = verifyTelegramInitData(initData);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error verifying init data:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
