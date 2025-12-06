import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response';
import { createQuestionSchema } from '@/lib/validators/community';

async function createQuestion(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    const validation = createQuestionSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const { description, ...rest } = validation.data;
    const question = await prisma.question.create({
      data: {
        userId: req.user.id,
        content: description,
        ...rest,
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
      message: 'প্রশ্ন করা হয়েছে',
      question,
    });
  } catch (error) {
    console.error('Create question error:', error);
    return errorResponse('প্রশ্ন করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function getQuestions(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);
    const solved = searchParams.get('solved');

    const where: Record<string, unknown> = {};
    if (solved === 'true') where.isSolved = true;
    if (solved === 'false') where.isSolved = false;

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              answers: true,
            },
          },
        },
      }),
      prisma.question.count({ where }),
    ]);

    return paginatedResponse(questions, page, limit, total);
  } catch (error) {
    console.error('Get questions error:', error);
    return errorResponse('প্রশ্ন পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createQuestion);
export const GET = withAuth(getQuestions);
