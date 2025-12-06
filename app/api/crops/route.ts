import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationParams } from '@/lib/api-middleware';
import { paginatedResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    const category = searchParams.get('category');
    const season = searchParams.get('season');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (category) where.category = category;
    if (season) where.seasons = { has: season };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameBn: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [crops, total] = await Promise.all([
      prisma.crop.findMany({
        where,
        orderBy: { nameBn: 'asc' },
        skip,
        take: limit,
      }),
      prisma.crop.count({ where }),
    ]);

    return paginatedResponse(crops, page, limit, total);
  } catch (error) {
    console.error('Get crops error:', error);
    return errorResponse('ফসল পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
