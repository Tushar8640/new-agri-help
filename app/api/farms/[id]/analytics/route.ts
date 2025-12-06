import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse, notFoundResponse, ErrorCodes } from '@/lib/api-response';

async function getAnalytics(
  req: AuthenticatedRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check farm ownership
    const farm = await prisma.farm.findUnique({
      where: { id: params.id },
    });

    if (!farm) {
      return notFoundResponse('খামার পাওয়া যায়নি');
    }

    if (farm.userId !== req.user.id) {
      return errorResponse('আপনার অনুমতি নেই', ErrorCodes.FORBIDDEN, 403);
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || '30'; // days
    const days = parseInt(period, 10);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get expenses
    const expenses = await prisma.expense.findMany({
      where: {
        farmId: params.id,
        date: { gte: startDate },
      },
    });

    // Get harvests
    const harvests = await prisma.harvest.findMany({
      where: {
        farmId: params.id,
        harvestDate: { gte: startDate },
      },
    });

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalRevenue = harvests.reduce((sum, h) => sum + (h.soldPrice || 0), 0);
    const profit = totalRevenue - totalExpenses;
    const roi = totalExpenses > 0 ? (profit / totalExpenses) * 100 : 0;

    // Group expenses by category
    const expensesByCategory = expenses.reduce((acc: Record<string, number>, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

    // Group by month
    const expensesByMonth = expenses.reduce((acc: Record<string, number>, e) => {
      const month = e.date.toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + e.amount;
      return acc;
    }, {});

    return successResponse({
      summary: {
        totalRevenue,
        totalExpenses,
        profit,
        roi: Math.round(roi),
      },
      expensesByCategory,
      expensesByMonth,
      harvests: harvests.map((h) => ({
        date: h.harvestDate,
        quantity: h.quantity,
        value: h.soldPrice || 0,
      })),
    });
  } catch (error) {
    console.error('Get farm analytics error:', error);
    return errorResponse('বিশ্লেষণ পেতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const GET = withAuth(getAnalytics);
