import { z } from 'zod';

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive('পরিমাণ ০ এর বেশি হতে হবে'),
      price: z.number().positive('দাম ০ এর বেশি হতে হবে'),
    })
  ).min(1, 'কমপক্ষে একটি পণ্য থাকতে হবে'),
  shippingAddress: z.object({
    name: z.string().min(2, 'নাম দিন'),
    phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক মোবাইল নম্বর দিন'),
    division: z.string(),
    district: z.string(),
    upazila: z.string().optional(),
    address: z.string().min(10, 'সম্পূর্ণ ঠিকানা দিন'),
  }),
  paymentMethod: z.enum(['COD', 'BKASH', 'NAGAD']),
  notes: z.string().optional(),
});

export const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']).optional(),
  trackingNumber: z.string().optional(),
  cancelReason: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
