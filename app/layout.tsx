import type { Metadata } from 'next';
import { Comfortaa, Lato } from 'next/font/google';

import TanStackProvider from '@/components/providers/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/providers/AuthProvider/AuthProvider';

import './globals.css';

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Лелека - щоденник майбутньої матусі',
  openGraph: {
    title: 'Лелека',
    description: 'Лелека - щоденник майбутньої матусі',
    url: process.env.NEXT_PUBLIC_API_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/leleka.jpg`,
        width: 720,
        height: 900,
        alt: 'Лелека логотип',
      },
    ],
    type: 'article',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="uk">
      <body
        className={`${comfortaa.variable} ${lato.variable}`}
      >
        <TanStackProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}