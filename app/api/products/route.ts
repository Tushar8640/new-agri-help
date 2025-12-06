import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationParams } from '@/lib/api-middleware';
import { paginatedResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    // Filters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');

    const where: Record<string, unknown> = {
      status: 'AVAILABLE',
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameBn: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) (where.price as Record<string, unknown>).gte = parseFloat(minPrice);
      if (maxPrice) (where.price as Record<string, unknown>).lte = parseFloat(maxPrice);
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          nameBn: true,
          category: true,
          price: true,
          rating: true,
          images: true,
          stock: true,
          seller: {
            select: {
              id: true,
              businessName: true,
              businessNameBn: true,
              rating: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return paginatedResponse(products, page, limit, total);
  } catch (error) {
    console.error('Get products error:', error);
    return errorResponse('পণ্য পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
