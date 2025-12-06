import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, notFoundResponse, errorResponse } from '@/lib/api-response';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        seller: {
          select: {
            id: true,
            businessName: true,
            businessNameBn: true,
            rating: true,
          },
        },
        reviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return notFoundResponse('পণ্য পাওয়া যায়নি');
    }

    return successResponse(product);
  } catch (error) {
    console.error('Get product error:', error);
    return errorResponse('পণ্য বিস্তারিত পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
