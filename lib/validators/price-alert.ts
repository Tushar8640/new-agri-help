import { z } from 'zod';

export const createPriceAlertSchema = z.object({
  cropId: z.string(),
  targetPrice: z.number().positive('দাম ০ এর বেশি হতে হবে'),
  condition: z.enum(['above', 'below']),
  marketId: z.string().optional(),
});

export const updatePriceAlertSchema = z.object({
  targetPrice: z.number().positive('দাম ০ এর বেশি হতে হবে').optional(),
  condition: z.enum(['above', 'below']).optional(),
  isActive: z.boolean().optional(),
});

export type CreatePriceAlertInput = z.infer<typeof createPriceAlertSchema>;
export type UpdatePriceAlertInput = z.infer<typeof updatePriceAlertSchema>;
