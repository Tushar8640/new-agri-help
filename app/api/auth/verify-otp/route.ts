import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/jwt';
import { verifyOtpSchema } from '@/lib/validators/auth';
import { successResponse, validationErrorResponse, errorResponse, ErrorCodes } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = verifyOtpSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error.issues[0].message);
    }

    const { phone, otp, name } = validation.data;

    // Demo mode: accept demo credentials
    if (phone === '01712345678' && otp === '123456') {
      let user = await prisma.user.findUnique({
        where: { phone },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            phone,
            name: name || 'Demo User',
            nameBn: 'ডেমো ব্যবহারকারী',
            role: 'FARMER',
            isVerified: true,
            password: 'otp-login',
          },
        });
      }

      const token = signToken({
        userId: user.id,
        role: user.role,
        name: user.name,
      });

      const response = NextResponse.json({
        success: true,
        data: {
          message: 'লগইন সফল হয়েছে',
          user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
          },
        },
      });

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      return response;
    }

    // Verify OTP from database
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        phone,
        code: otp,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!otpRecord) {
      return errorResponse('ভুল বা মেয়াদ শেষ OTP', ErrorCodes.INVALID_OTP, 401);
      );
    }

    // Mark OTP as verified
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // Create new user if registering
      if (!name) {
        return errorResponse('নতুন ব্যবহারকারীর জন্য নাম প্রয়োজন', ErrorCodes.VALIDATION_ERROR);
      }

      user = await prisma.user.create({
        data: {
          phone,
          name,
          role: 'FARMER',
          isVerified: true,
          password: 'otp-login',
        },
      });
    }

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        message: 'লগইন সফল হয়েছে',
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: user.role,
        },
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return errorResponse('OTP যাচাই করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
    );
  }
}
