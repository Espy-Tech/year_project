import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intégrale avec Paramètre — Samake Ibrahim · КубГУ 2026',
  description: 'Premium Scientific Platform for Numerical Integration Analysis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
