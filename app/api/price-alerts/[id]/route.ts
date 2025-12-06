import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, notFoundResponse, errorResponse, ErrorCodes } from '@/lib/api-response';
import { updatePriceAlertSchema } from '@/lib/validators/price-alert';

async function updateAlert(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const validation = updatePriceAlertSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const existingAlert = await prisma.priceAlert.findUnique({
      where: { id: params.id },
    });

    if (!existingAlert) {
      return notFoundResponse('সতর্কতা পাওয়া যায়নি');
    }

    if (existingAlert.userId !== req.user.id) {
      return errorResponse('আপনার অনুমতি নেই', ErrorCodes.FORBIDDEN, 403);
    }

    const alert = await prisma.priceAlert.update({
      where: { id: params.id },
      data: validation.data,
    });

    return successResponse({
      message: 'সতর্কতা আপডেট হয়েছে',
      alert,
    });
  } catch (error) {
    console.error('Update price alert error:', error);
    return errorResponse('সতর্কতা আপডেট করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function deleteAlert(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingAlert = await prisma.priceAlert.findUnique({
      where: { id: params.id },
    });

    if (!existingAlert) {
      return notFoundResponse('সতর্কতা পাওয়া যায়নি');
    }

    if (existingAlert.userId !== req.user.id) {
      return errorResponse('আপনার অনুমতি নেই', ErrorCodes.FORBIDDEN, 403);
    }

    await prisma.priceAlert.delete({
      where: { id: params.id },
    });

    return successResponse({ message: 'সতর্কতা মুছে ফেলা হয়েছে' });
  } catch (error) {
    console.error('Delete price alert error:', error);
    return errorResponse('সতর্কতা মুছতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const PATCH = withAuth(updateAlert);
export const DELETE = withAuth(deleteAlert);
