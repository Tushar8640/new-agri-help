import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response';
import { createPostSchema } from '@/lib/validators/community';

async function createPost(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    const validation = createPostSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const { type, ...rest } = validation.data;
    const post = await prisma.communityPost.create({
      data: {
        userId: req.user.id,
        type: type === 'general' ? 'TEXT' : type === 'tip' ? 'IMAGE' : 'TEXT',
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
      message: 'পোস্ট প্রকাশিত হয়েছে',
      post,
    });
  } catch (error) {
    console.error('Create post error:', error);
    return errorResponse('পোস্ট করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function getPosts(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {};
    if (type) where.type = type;

    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
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
        },
      }),
      prisma.communityPost.count({ where }),
    ]);

    return paginatedResponse(posts, page, limit, total);
  } catch (error) {
    console.error('Get posts error:', error);
    return errorResponse('পোস্ট পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createPost);
export const GET = withAuth(getPosts);
