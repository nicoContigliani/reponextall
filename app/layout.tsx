import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'LlakaServices',
  description: 'Plataforma de servicios con arquitectura Server-Driven',
  themeColor: '#020B1E',
  robots: { index: true, follow: true }
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="es" className="h-full scroll-smooth antialiased">
        <body
          className={`${inter.variable} min-h-screen bg-ucl-navy text-ucl-white antialiased`}
        >
           <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
