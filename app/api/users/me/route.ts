import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response';
import { updateUserSchema } from '@/lib/validators/user';

async function getUser(req: AuthenticatedRequest) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        nameBn: true,
        phone: true,
        email: true,
        role: true,
        avatar: true,
        division: true,
        district: true,
        upazila: true,
        farmSize: true,
        experience: true,
        primaryCrops: true,
        isVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return notFoundResponse('ব্যবহারকারী পাওয়া যায়নি');
    }

    return successResponse(user);
  } catch (error) {
    console.error('Get user error:', error);
    return errorResponse('ব্যবহারকারী তথ্য পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function updateUser(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: validation.data,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        avatar: true,
        division: true,
        district: true,
        upazila: true,
        farmSize: true,
        experience: true,
        primaryCrops: true,
      },
    });

    return successResponse({
      message: 'প্রোফাইল আপডেট হয়েছে',
      user,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return errorResponse('প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const GET = withAuth(getUser);
export const PATCH = withAuth(updateUser);
