import { NextResponse } from 'next/server';

export type ApiSuccessResponse<T = any> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: string;
  code?: string;
};

export type ApiPaginatedResponse<T = any> = {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const ErrorCodes = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  INVALID_OTP: 'INVALID_OTP',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

export function successResponse<T>(data: T) {
  return NextResponse.json<ApiSuccessResponse<T>>({
    success: true,
    data,
  });
}

export function errorResponse(error: string, code?: string, status: number = 400) {
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      error,
      code,
    },
    { status }
  );
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return NextResponse.json<ApiPaginatedResponse<T>>({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export function unauthorizedResponse(message: string = 'Authentication required') {
  return errorResponse(message, ErrorCodes.AUTH_REQUIRED, 401);
}

export function notFoundResponse(message: string = 'Resource not found') {
  return errorResponse(message, ErrorCodes.NOT_FOUND, 404);
}

export function validationErrorResponse(message: string = 'Validation failed') {
  return errorResponse(message, ErrorCodes.VALIDATION_ERROR, 400);
}
