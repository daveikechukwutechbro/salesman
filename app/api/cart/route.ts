import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: { include: { category: true } } },
      orderBy: { createdAt: 'asc' },
    });

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId, quantity = 1 } = body;

    if (!userId || !productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
    }

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existing) {
      const newQty = existing.quantity + quantity;
      if (newQty > product.stock) {
        return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
      }
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: newQty },
      });
    } else {
      await prisma.cartItem.create({
        data: { userId, productId, quantity },
      });
    }

    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: { include: { category: true } } },
    });
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId, quantity } = body;

    if (!userId || !productId || quantity === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (quantity <= 0) {
      await prisma.cartItem.deleteMany({
        where: { userId, productId },
      });
    } else {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product || product.stock < quantity) {
        return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
      }
      await prisma.cartItem.updateMany({
        where: { userId, productId },
        data: { quantity },
      });
    }

    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: { include: { category: true } } },
    });
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return NextResponse.json({ items, total });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.cartItem.deleteMany({
      where: { userId, productId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing cart item:', error);
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}
