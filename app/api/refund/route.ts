import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, transactionId } = body;

    if (!userId || !transactionId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and transactionId' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: { transactionId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'refunded' },
    });

    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (BOT_TOKEN && order.telegramChargeId) {
      await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/refundStarPayment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: parseInt(userId),
            telegram_payment_charge_id: order.telegramChargeId,
          }),
        }
      ).catch((e) => {
        console.error('Telegram refund API error:', e);
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Refund has been processed successfully.',
    });
  } catch (error) {
    console.error('Error processing refund:', error);
    return NextResponse.json(
      { error: 'Failed to process refund' },
      { status: 500 }
    );
  }
}
