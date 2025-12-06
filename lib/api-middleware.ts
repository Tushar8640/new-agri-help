import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import { unauthorizedResponse } from '@/lib/api-response';

export type AuthenticatedRequest = NextRequest & {
  user: {
    id: string;
    phone: string;
    name?: string | null;
    role: string;
  };
};

export async function withAuth<T>(
  handler: (req: AuthenticatedRequest, context?: any) => Promise<T>
) {
  return async (req: NextRequest, context?: any) => {
    try {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        return unauthorizedResponse('দয়া করে লগইন করুন');
      }

      // Attach user to request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = {
        id: session.user.id,
        phone: session.user.phone,
        name: session.user.name,
        role: session.user.role,
      };

      return await handler(authenticatedReq, context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return unauthorizedResponse();
    }
  };
}

export function getPaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
