import { z } from 'zod';

export const sendOtpSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন'),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন'),
  otp: z.string().length(6, 'OTP ৬ সংখ্যার হতে হবে'),
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে').optional(),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
