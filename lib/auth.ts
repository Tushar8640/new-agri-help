import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { prisma } from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
          return null;
        }

        const phone = credentials.phone as string;
        const otp = credentials.otp as string;

        // Demo mode: accept demo credentials
        if (phone === '01712345678' && otp === '123456') {
          // Find or create demo user
          let user = await prisma.user.findUnique({
            where: { phone },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                phone,
                name: 'Demo User',
                nameBn: 'ডেমো ব্যবহারকারী',
                role: 'FARMER',
                isVerified: true,
                password: 'otp-login',
              },
            });
          }

          return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
          };
        }

        // Verify OTP from database
        const otpRecord = await prisma.oTP.findFirst({
          where: {
            phone,
            code: otp,
            verified: false,
            expiresAt: {
              gt: new Date(),
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (!otpRecord) {
          return null;
        }

        // Mark OTP as verified
        await prisma.oTP.update({
          where: { id: otpRecord.id },
          data: { verified: true },
        });

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { phone },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              phone,
              name: phone,
              isVerified: true,
              password: 'otp-login',
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
