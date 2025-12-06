import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest, getPaginationParams } from '@/lib/api-middleware';
import { successResponse, paginatedResponse, errorResponse } from '@/lib/api-response';
import { createOrderSchema } from '@/lib/validators/order';

async function createOrder(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const { items, shippingAddress, paymentMethod } = validation.data;

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost = subtotal > 1000 ? 0 : 50; // Free shipping over ৳1000
    const total = subtotal + shippingCost;

    // Get first item's seller (assuming single seller per order)
    const firstProduct = await prisma.product.findUnique({
      where: { id: items[0].productId },
      select: { sellerId: true },
    });

    if (!firstProduct) {
      return errorResponse('পণ্য পাওয়া যায়নি', 'NOT_FOUND');
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        sellerId: firstProduct.sellerId,
        orderNumber: `ORD-${Date.now()}`,
        total,
        deliveryAddress: `${shippingAddress.name}, ${shippingAddress.phone}, ${shippingAddress.address}, ${shippingAddress.district}, ${shippingAddress.division}`,
        status: 'PENDING',
        paymentMethod,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                nameBn: true,
                images: true,
              },
            },
          },
        },
      },
    });

    return successResponse({
      message: 'অর্ডার সফল হয়েছে',
      order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return errorResponse('অর্ডার করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

async function getOrders(req: AuthenticatedRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPaginationParams(searchParams);
    const status = searchParams.get('status');

    const where: Record<string, unknown> = { userId: req.user.id };
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  nameBn: true,
                  images: true,
                },
              },
            },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return paginatedResponse(orders, page, limit, total);
  } catch (error) {
    console.error('Get orders error:', error);
    return errorResponse('অর্ডার পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(createOrder);
export const GET = withAuth(getOrders);
