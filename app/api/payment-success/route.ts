import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, orderNumber, transactionId } = body;

    if (!userId || !orderNumber || !transactionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const daysUntilDelivery = 3 + Math.floor(Math.random() * 5);
    const estimatedDelivery = new Date(Date.now() + daysUntilDelivery * 86400000);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        totalAmount,
        transactionId,
        status: 'confirmed',
        estimatedDelivery,
        items: {
          create: cartItems.map((ci) => ({
            productId: ci.productId,
            name: ci.product.name,
            price: ci.product.price,
            quantity: ci.quantity,
            image: ci.product.image,
          })),
        },
      },
      include: { items: true },
    });

    for (const ci of cartItems) {
      await prisma.product.update({
        where: { id: ci.productId },
        data: { stock: { decrement: ci.quantity } },
      });
    }

    await prisma.cartItem.deleteMany({ where: { userId } });

    const receipt = {
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      items: order.items,
      estimatedDelivery: order.estimatedDelivery?.toISOString() || null,
      createdAt: order.createdAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      order,
      receipt,
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json({ error: 'Failed to confirm payment' }, { status: 500 });
  }
}
