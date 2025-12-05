import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Validate Bangladesh phone number format
function validateBDPhone(phone: string): boolean {
  const bdPhoneRegex = /^01[3-9]\d{8}$/;
  return bdPhoneRegex.test(phone);
}

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || !validateBDPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid Bangladesh phone number. Must start with 01' },
        { status: 400 }
      );
    }

    // Demo mode: always return success for demo phone
    if (phone === '01712345678') {
      return NextResponse.json({
        message: 'Demo OTP sent successfully. Use 123456',
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

    return NextResponse.json({
      message: 'OTP sent successfully',
      expiresIn: 300,
      // In dev mode, return the OTP for testing
      ...(process.env.NODE_ENV === 'development' && { otp: code }),
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
