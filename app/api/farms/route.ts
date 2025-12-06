import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response';
import { createFarmSchema } from '@/lib/validators/farm';

async function createFarm(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    const validation = createFarmSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const farm = await prisma.farm.create({
      data: {
        userId: req.user.id,
        ...validation.data,
      },
    });

    return successResponse({
      message: 'খামার যোগ করা হয়েছে',
      farm,
    });
  } catch (error) {
    console.error('Create farm error:', error);
    return errorResponse('খামার যোগ করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function getFarms(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    const [farms, total] = await Promise.all([
      prisma.farm.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              fields: true,
            },
          },
        },
      }),
      prisma.farm.count({ where: { userId: req.user.id } }),
    ]);

    return paginatedResponse(farms, page, limit, total);
  } catch (error) {
    console.error('Get farms error:', error);
    return errorResponse('খামার পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createFarm);
export const GET = withAuth(getFarms);
