import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationParams } from '@/lib/api-middleware';
import { paginatedResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { titleBn: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          title: true,
          titleBn: true,
          category: true,
          authorName: true,
          viewCount: true,
          createdAt: true,
        },
      }),
      prisma.article.count({ where }),
    ]);

    return paginatedResponse(articles, page, limit, total);
  } catch (error) {
    console.error('Get articles error:', error);
    return errorResponse('নিবন্ধ পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
