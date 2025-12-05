'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setStep('otp');
      setCountdown(300); // 5 minutes
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify OTP');
      }

      // Force a hard reload to ensure auth state is updated
      window.location.href = '/';
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">কৃষিমিত্র</CardTitle>
          <CardDescription className="text-center">
            {step === 'phone' ? 'আপনার ফোন নম্বর দিন' : 'OTP যাচাই করুন'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">ফোন নম্বর</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-11 text-base"
                  maxLength={11}
                />
                <p className="text-sm text-muted-foreground">
                  ডেমো লগইন: 01712345678
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={loading || phone.length !== 11}
              >
                {loading ? 'পাঠানো হচ্ছে...' : 'OTP পাঠান'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">নতুন ব্যবহারকারী? </span>
                <a href="/register" className="text-primary hover:underline font-medium">
                  নিবন্ধন করুন
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP কোড</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                  className="h-11 text-base text-center text-2xl tracking-widest"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-sm text-muted-foreground text-center">
                  {phone} নম্বরে OTP পাঠানো হয়েছে
                  <br />
                  ডেমো OTP: 123456
                </p>
              </div>

              {countdown > 0 && (
                <div className="text-sm text-center text-muted-foreground">
                  সময় বাকি: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                </div>
              )}

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-11 text-base"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? 'যাচাই করা হচ্ছে...' : 'যাচাই করুন'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 text-base"
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                    setError('');
                  }}
                >
                  ফিরে যান
                </Button>
              </div>

              {countdown === 0 && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                      setError('');
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    পুনরায় OTP পাঠান
                  </button>
                </div>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
