import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nexus Solusi Integra — Konsultan Keuangan, Manajemen & IT',
    template: '%s | Nexus Solusi Integra',
  },
  description:
    'Perusahaan konsultan terpercaya yang bergerak di tiga pilar utama: Konsultan Keuangan, Manajemen Bisnis, dan Teknologi Informasi. Wujudkan transformasi bisnis Anda bersama kami.',
  keywords: [
    'konsultan keuangan',
    'manajemen bisnis',
    'konsultan IT',
    'transformasi digital',
    'company profile',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Nexus Solusi Integra',
    title: 'Nexus Solusi Integra — Konsultan Keuangan, Manajemen & IT',
    description:
      'Perusahaan konsultan terpercaya yang bergerak di tiga pilar utama: Konsultan Keuangan, Manajemen Bisnis, dan Teknologi Informasi.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
