import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, notFoundResponse, errorResponse, ErrorCodes } from '@/lib/api-response';

async function getDetection(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const detection = await prisma.diseaseReport.findUnique({
      where: { id: params.id },
    });

    if (!detection) {
      return notFoundResponse('রোগ শনাক্তকরণ পাওয়া যায়নি');
    }

    // Check if user owns this detection
    if (detection.userId !== req.user.id) {
      return errorResponse('আপনার অনুমতি নেই', ErrorCodes.FORBIDDEN, 403);
    }

    return successResponse(detection);
  } catch (error) {
    console.error('Get detection error:', error);
    return errorResponse('বিস্তারিত পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const GET = withAuth(getDetection);
