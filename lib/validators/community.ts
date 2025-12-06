import { z } from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(10, 'পোস্ট কমপক্ষে ১০ অক্ষরের হতে হবে'),
  type: z.enum(['success', 'tip', 'general']),
  images: z.array(z.string()).optional(),
  cropTags: z.array(z.string()).optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, 'মন্তব্য দিন'),
});

export const createQuestionSchema = z.object({
  title: z.string().min(10, 'শিরোনাম কমপক্ষে ১০ অক্ষরের হতে হবে'),
  description: z.string().min(20, 'বিস্তারিত কমপক্ষে ২০ অক্ষরের হতে হবে'),
  category: z.string(),
  cropId: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const createAnswerSchema = z.object({
  content: z.string().min(20, 'উত্তর কমপক্ষে ২০ অক্ষরের হতে হবে'),
  images: z.array(z.string()).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type CreateAnswerInput = z.infer<typeof createAnswerSchema>;
