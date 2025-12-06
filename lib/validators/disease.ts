import { z } from 'zod';

export const detectDiseaseSchema = z.object({
  image: z.string().url('সঠিক ছবির URL দিন'),
  cropType: z.string().optional(),
  location: z.string().optional(),
});

export type DetectDiseaseInput = z.infer<typeof detectDiseaseSchema>;
