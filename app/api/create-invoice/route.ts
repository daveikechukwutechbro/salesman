import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { allowed, retryAfter } = checkRateLimit(`checkout:${ip}`, 3, 60000);
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Not enough stock for ${item.product.name}` },
          { status: 400 }
        );
      }
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
    }

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const payload = JSON.stringify({
      userId,
      orderNumber,
      timestamp: Date.now(),
    });

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Order #${orderNumber}`,
          description: `${cartItems.length} item(s) - ${cartItems.map(i => i.product.name).join(', ').substring(0, 100)}`,
          payload,
          provider_token: '',
          currency: 'XTR',
          prices: [
            { label: 'Total', amount: totalAmount },
          ],
        }),
      }
    );

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return NextResponse.json(
        { error: data.description || 'Failed to create invoice' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoiceLink: data.result,
      orderNumber,
      totalAmount,
    });
  } catch (error) {
    console.error('Error creating checkout invoice:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
