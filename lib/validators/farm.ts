import { z } from 'zod';

export const createFarmSchema = z.object({
  name: z.string().min(2, 'খামারের নাম দিন'),
  size: z.number().positive('আকার ০ এর বেশি হতে হবে'),
  unit: z.enum(['bigha', 'acre', 'hectare']),
  division: z.string(),
  district: z.string(),
  upazila: z.string().optional(),
  soilType: z.string().optional(),
  irrigationType: z.string().optional(),
});

export const createFieldSchema = z.object({
  name: z.string().min(2, 'জমির নাম দিন'),
  size: z.number().positive('আকার ০ এর বেশি হতে হবে'),
  unit: z.enum(['bigha', 'acre', 'hectare']),
  currentCrop: z.string().optional(),
  plantedDate: z.string().optional(),
});

export const createActivitySchema = z.object({
  type: z.enum(['planting', 'fertilizer', 'watering', 'pesticide', 'weeding', 'harvesting']),
  date: z.string(),
  cost: z.number().min(0, 'খরচ ০ বা তার বেশি হতে হবে').optional(),
  notes: z.string().optional(),
  photo: z.string().optional(),
  fieldId: z.string().optional(),
});

export const createExpenseSchema = z.object({
  category: z.enum(['seeds', 'fertilizer', 'pesticide', 'labor', 'irrigation', 'equipment']),
  amount: z.number().positive('পরিমাণ ০ এর বেশি হতে হবে'),
  date: z.string(),
  description: z.string().optional(),
  fieldId: z.string().optional(),
});

export const createHarvestSchema = z.object({
  fieldId: z.string(),
  cropId: z.string(),
  quantity: z.number().positive('পরিমাণ ০ এর বেশি হতে হবে'),
  unit: z.enum(['kg', 'mon', 'quintal']),
  quality: z.enum(['excellent', 'good', 'average', 'poor']).optional(),
  soldPrice: z.number().min(0, 'দাম ০ বা তার বেশি হতে হবে').optional(),
  date: z.string(),
});

export type CreateFarmInput = z.infer<typeof createFarmSchema>;
export type CreateFieldInput = z.infer<typeof createFieldSchema>;
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type CreateHarvestInput = z.infer<typeof createHarvestSchema>;
