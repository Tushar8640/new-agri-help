import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { createAnswerSchema } from '@/lib/validators/community';

async function createAnswer(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const validation = createAnswerSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const answer = await prisma.answer.create({
      data: {
        questionId: params.id,
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
      message: 'উত্তর দেওয়া হয়েছে',
      answer,
    });
  } catch (error) {
    console.error('Create answer error:', error);
    return errorResponse('উত্তর দিতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createAnswer);
