import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createCommentSchema } from '@/lib/validators/community';

async function createComment(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const comment = await prisma.comment.create({
      data: {
        postId: params.id,
        userId: req.user.id,
        content: validation.data.content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return successResponse({
      message: 'মন্তব্য যোগ করা হয়েছে',
      comment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return errorResponse('মন্তব্য করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createComment);
