import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { paginatedResponse, errorResponse } from '@/lib/api-response';

async function getHistory(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    const [detections, total] = await Promise.all([
      prisma.diseaseReport.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          images: true,
          aiDetected: true,
          aiConfidence: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.diseaseReport.count({
        where: { userId: req.user.id },
      }),
    ]);

    return paginatedResponse(detections, page, limit, total);
  } catch (error) {
    console.error('Get disease history error:', error);
    return errorResponse('ইতিহাস পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const GET = withAuth(getHistory);
