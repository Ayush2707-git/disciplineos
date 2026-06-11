import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DisciplineOS — Build the Best Version of You',
  description: 'AI-powered personal operating system. Daily missions, discipline tracking, and an AI that knows your patterns better than you do.',
  keywords: ['discipline', 'productivity', 'habits', 'AI coach', 'personal development', 'goal tracking'],
  manifest: '/manifest.json',
  openGraph: {
    title: 'DisciplineOS — Build the Best Version of You',
    description: 'Daily missions. Discipline age. AI pattern detection. The operating system for your life.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-[#0A0A0F] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
