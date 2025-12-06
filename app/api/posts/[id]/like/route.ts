import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response';

async function toggleLike(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.communityPost.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return notFoundResponse('পোস্ট পাওয়া যায়নি');
    }

    // Increment likeCount (in real app, track individual likes)
    await prisma.communityPost.update({
      where: { id: params.id },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    });

    return successResponse({ liked: true, message: 'লাইক করা হয়েছে' });
  } catch (error) {
    console.error('Toggle like error:', error);
    return errorResponse('লাইক করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(toggleLike);
