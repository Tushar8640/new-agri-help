import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে').optional(),
  email: z.string().email('সঠিক ইমেইল দিন').optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  upazila: z.string().optional(),
  farmSize: z.number().positive('খামারের আকার ০ এর বেশি হতে হবে').optional(),
  farmUnit: z.enum(['bigha', 'acre', 'hectare']).optional(),
  experience: z.number().min(0, 'অভিজ্ঞতা ০ বা তার বেশি হতে হবে').optional(),
  primaryCrops: z.array(z.string()).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
