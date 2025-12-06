import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response';
import { createPriceAlertSchema } from '@/lib/validators/price-alert';

async function createAlert(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    const validation = createPriceAlertSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const { condition, ...rest } = validation.data;
    const alert = await prisma.priceAlert.create({
      data: {
        userId: req.user.id,
        alertType: condition === 'above' ? 'PRICE_RISE' : 'PRICE_DROP',
        ...rest,
      },
    });

    return successResponse({
      message: 'দাম সতর্কতা যোগ করা হয়েছে',
      alert,
    });
  } catch (error) {
    console.error('Create price alert error:', error);
    return errorResponse('সতর্কতা যোগ করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function getAlerts(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);

    const [alerts, total] = await Promise.all([
      prisma.priceAlert.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.priceAlert.count({ where: { userId: req.user.id } }),
    ]);

    return paginatedResponse(alerts, page, limit, total);
  } catch (error) {
    console.error('Get price alerts error:', error);
    return errorResponse('সতর্কতা পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createAlert);
export const GET = withAuth(getAlerts);
