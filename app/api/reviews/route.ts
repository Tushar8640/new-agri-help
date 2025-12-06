import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createReviewSchema } from '@/lib/validators/product';

async function createReview(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = createReviewSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const { productId, rating, comment, images } = validation.data;

    // Check if user has purchased this product
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: req.user.id,
          status: 'DELIVERED',
        },
      },
    });

    if (!hasPurchased) {
      return errorResponse('আপনি এই পণ্যটি কিনেননি', 'FORBIDDEN', 403);
    }

    // Check if already reviewed
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: req.user.id,
        productId,
      },
    });

    if (existingReview) {
      return errorResponse('আপনি ইতিমধ্যে রিভিউ দিয়েছেন', 'VALIDATION_ERROR');
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        productId,
        rating,
        comment,
        images: images || [],
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Update product rating
    const reviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: avgRating,
      },
    });

    return successResponse({
      message: 'রিভিউ যোগ করা হয়েছে',
      review,
    });
  } catch (error) {
    console.error('Create review error:', error);
    return errorResponse('রিভিউ করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createReview);
