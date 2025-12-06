import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationParams } from '@/lib/api-middleware';
import { paginatedResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    const division = searchParams.get('division');
    const district = searchParams.get('district');
    const category = searchParams.get('category');
    const dateParam = searchParams.get('date');

    const where: Record<string, unknown> = {};

    if (division) where.division = division;
    if (district) where.district = district;
    if (category) where.category = category;
    if (dateParam) {
      where.date = new Date(dateParam);
    } else {
      // Get today's prices by default
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      where.date = { gte: today };
    }

    const [prices, total] = await Promise.all([
      prisma.marketPrice.findMany({
        where,
        orderBy: { date: 'desc' },
        skip,
        take: limit,
        include: {
          crop: {
            select: {
              name: true,
              nameBn: true,
              category: true,
            },
          },
          market: {
            select: {
              name: true,
              nameBn: true,
            },
          },
        },
      }),
      prisma.marketPrice.count({ where }),
    ]);

    return paginatedResponse(prices, page, limit, total);
  } catch (error) {
    console.error('Get market prices error:', error);
    return errorResponse('বাজার দর পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
