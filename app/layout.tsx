import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { AuthGuard } from "@/components/auth-guard";
import { MainLayout } from "@/components/layout/main-layout";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-noto-sans-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "কৃষিমিত্র - KrishiMitra",
  description: "আপনার কৃষি সহায়ক",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${hindSiliguri.variable} ${notoSansBengali.variable} font-sans antialiased`}
      >
        <AuthGuard>
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      </body>
    </html>
  );
}
