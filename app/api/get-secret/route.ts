import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSecretForItem } from '@/lib/secrets';

export async function GET(req: NextRequest) {
  try {
    const itemId = req.nextUrl.searchParams.get('itemId');
    const transactionId = req.nextUrl.searchParams.get('transactionId');

    if (!itemId || !transactionId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const purchase = await prisma.purchase.findUnique({
      where: { transactionId },
    });

    if (!purchase || purchase.itemId !== itemId) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    const secret = getSecretForItem(itemId);

    return NextResponse.json({ secret });
  } catch (error) {
    console.error('Error retrieving secret:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve secret' },
      { status: 500 }
    );
  }
}
