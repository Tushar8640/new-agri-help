import { prisma } from '@/lib/prisma';
import { withAuth, AuthenticatedRequest } from '@/lib/api-middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { detectDiseaseSchema } from '@/lib/validators/disease';

async function detectDisease(req: AuthenticatedRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = detectDiseaseSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.issues[0].message, 'VALIDATION_ERROR');
    }

    const { image } = validation.data;

    // TODO: Integrate with AI model
    // For now, return mock response
    const mockDisease = {
      name: 'ধানের ব্লাস্ট',
      nameBn: 'ধানের ব্লাস্ট',
      confidence: 0.92,
      severity: 'HIGH' as const,
      symptoms: ['পাতায় ছোট ছোট দাগ', 'পাতা শুকিয়ে যাওয়া'],
      treatment: 'ট্রাইসাইক্লাজোল ছত্রাকনাশক প্রয়োগ করুন',
      preventiveMeasures: ['সুষম সার প্রয়োগ', 'পানি নিষ্কাশনের ব্যবস্থা'],
    };

    // Save detection to database
    const detection = await prisma.diseaseReport.create({
      data: {
        userId: req.user.id,
        images: [image],
        aiDetected: true,
        aiConfidence: mockDisease.confidence,
        status: 'PENDING',
      },
    });

    return successResponse({
      detection: {
        id: detection.id,
        disease: mockDisease.name,
        confidence: mockDisease.confidence,
        severity: mockDisease.severity,
        symptoms: mockDisease.symptoms,
        treatment: mockDisease.treatment,
        preventiveMeasures: mockDisease.preventiveMeasures,
        detectedAt: detection.createdAt,
      },
    });
  } catch (error) {
    console.error('Detect disease error:', error);
    return errorResponse('রোগ শনাক্ত করতে ব্যর্থ হয়েছে', 'SERVER_ERROR', 500);
  }
}

export const POST = withAuth(detectDisease);
