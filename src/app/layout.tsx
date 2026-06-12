import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          id="pwa-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0A0A0F] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
