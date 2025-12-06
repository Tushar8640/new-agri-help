import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response';

async function getNotifications(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);
    const unreadOnly = searchParams.get('unread') === 'true';

    const where: Record<string, unknown> = { userId: req.user.id };
    if (unreadOnly) {
      where.isRead = false;
    }

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: { userId: req.user.id, isRead: false },
      }),
    ]);

    return paginatedResponse(
      notifications.map((n) => ({ ...n, unreadCount })),
      page,
      limit,
      total
    );
  } catch (error) {
    console.error('Get notifications error:', error);
    return errorResponse('নোটিফিকেশন পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function markAllRead(req: AuthenticatedRequest) {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return successResponse({ message: 'সব পড়া হয়েছে' });
  } catch (error) {
    console.error('Mark all read error:', error);
    return errorResponse('আপডেট করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const GET = withAuth(getNotifications);
export const PATCH = withAuth(markAllRead);
