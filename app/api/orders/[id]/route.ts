import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, notFoundResponse, errorResponse, ErrorCodes } from '@/lib/api-response';
import { updateOrderSchema } from '@/lib/validators/order';

async function getOrder(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                nameBn: true,
                images: true,
                seller: {
                  select: {
                    businessName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return notFoundResponse('অর্ডার পাওয়া যায়নি');
    }

    if (order.userId !== req.user.id) {
      return errorResponse('আপনার অনুমতি নেই', ErrorCodes.FORBIDDEN, 403);
    }

    return successResponse(order);
  } catch (error) {
    console.error('Get order error:', error);
    return errorResponse('অর্ডার বিস্তারিত পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function updateOrder(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // Validate input
    const validation = updateOrderSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    // Check if user owns this order
    const existingOrder = await prisma.order.findUnique({
      where: { id: params.id },
    });

    if (!existingOrder) {
      return notFoundResponse('অর্ডার পাওয়া যায়নি');
    }

    if (existingOrder.userId !== req.user.id) {
      return errorResponse('আপনার অনুমতি নেই', ErrorCodes.FORBIDDEN, 403);
    }

    // Only allow cancellation by user
    if (validation.data.status && validation.data.status !== 'CANCELLED') {
      return errorResponse('আপনি শুধুমাত্র অর্ডার বাতিল করতে পারেন', ErrorCodes.FORBIDDEN, 403);
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: validation.data,
    });

    return successResponse({
      message: 'অর্ডার আপডেট হয়েছে',
      order,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return errorResponse('অর্ডার আপডেট করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const GET = withAuth(getOrder);
export const PATCH = withAuth(updateOrder);
