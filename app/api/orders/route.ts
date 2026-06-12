import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const status = req.nextUrl.searchParams.get('status') || '';

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const where: Record<string, unknown> = { userId };
    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });

    const serialized = orders.map((o) => ({
      ...o,
      estimatedDelivery: o.estimatedDelivery?.toISOString() || null,
      deliveredAt: o.deliveredAt?.toISOString() || null,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
    }));

    return NextResponse.json({ orders: serialized });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
