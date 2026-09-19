import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import '../styles/globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'),
  title: { default: 'MyTop', template: '%s — MyTop' },
  openGraph: { locale: 'ru_RU', siteName: 'MyTop' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ru' className={notoSansKr.variable}>
      <body>{children}</body>
    </html>
  );
}
