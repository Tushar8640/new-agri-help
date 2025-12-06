import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOtpSchema } from '@/lib/validators/auth';
import { successResponse, validationErrorResponse, errorResponse } from '@/lib/api-response';

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = sendOtpSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error.issues[0].message);
    }

    const { phone } = validation.data;

    // Demo mode: always return success for demo phone
    if (phone === '01712345678') {
      return successResponse({
        message: 'ডেমো OTP পাঠানো হয়েছে। ১২৩৪৫৬ ব্যবহার করুন',
        expiresIn: 300,
      });
    }

    // Generate OTP
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Delete old OTPs for this phone
    await prisma.oTP.deleteMany({
      where: { phone },
    });

    // Create new OTP
    await prisma.oTP.create({
      data: {
        phone,
        code,
        expiresAt,
      },
    });

    // TODO: In production, send OTP via SMS service (e.g., Twilio, SMS API)
    console.log(`OTP for ${phone}: ${code}`);

    return successResponse({
      message: 'OTP পাঠানো হয়েছে',
      expiresIn: 300,
      // In dev mode, return the OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp: code }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return errorResponse('OTP পাঠাতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}
