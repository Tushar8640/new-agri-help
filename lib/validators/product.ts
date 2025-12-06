import { z } from 'zod';

export const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5, 'রেটিং ১-৫ এর মধ্যে হতে হবে'),
  comment: z.string().min(10, 'মন্তব্য কমপক্ষে ১০ অক্ষরের হতে হবে').optional(),
  images: z.array(z.string()).optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
