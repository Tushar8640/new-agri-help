import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cropId = searchParams.get('cropId');
    const days = parseInt(searchParams.get('days') || '30', 10);

    if (!cropId) {
      return errorResponse('ফসল ID প্রয়োজন', 'VALIDATION_ERROR');
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const prices = await prisma.marketPrice.findMany({
      where: {
        cropId,
        date: { gte: startDate },
      },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        avgPrice: true,
        market: {
          select: {
            nameBn: true,
          },
        },
      },
    });

    // Calculate trend data
    const avgByDate = prices.reduce((acc: Record<string, { total: number; count: number }>, curr) => {
      const dateKey = curr.date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { total: 0, count: 0 };
      }
      acc[dateKey].total += curr.avgPrice;
      acc[dateKey].count += 1;
      return acc;
    }, {});

    const trends = Object.entries(avgByDate).map(([date, data]) => ({
      date,
      avgPrice: Math.round(data.total / data.count),
    }));

    return successResponse({ trends });
  } catch (error) {
    console.error('Get market trends error:', error);
    return errorResponse('ট্রেন্ড পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
