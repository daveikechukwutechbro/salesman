import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search') || '';
    const categoryId = req.nextUrl.searchParams.get('categoryId') || '';
    const featured = req.nextUrl.searchParams.get('featured');
    const sortBy = req.nextUrl.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = req.nextUrl.searchParams.get('sortOrder') || 'desc';
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const validSortFields = ['price', 'rating', 'createdAt', 'name', 'reviewCount'];
    const actualSortBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const actualSortOrder = sortOrder === 'asc' ? 'asc' : 'desc';

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { [actualSortBy]: actualSortOrder },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
