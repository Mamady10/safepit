import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SafePit — HSE Mines & Industrie',
  description:
    'Plateforme HSE pour mines et sites industriels : inspections, incidents, conformité et rapports.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://safepit.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
