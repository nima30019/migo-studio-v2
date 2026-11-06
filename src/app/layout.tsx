import type { Metadata } from 'next';
import './globals.css';
import { getAssetPath } from '@/utils/asset';

export const metadata: Metadata = {
  metadataBase: new URL('https://nima30019.github.io/migo-studio-v2'),
  title: {
    template: '%s',
    default: 'MIGO | Creative Technology Studio',
  },
  icons: {
    icon: [
      { url: getAssetPath('/migo-logo-transparent.png'), type: 'image/png' },
    ],
    apple: [
      { url: getAssetPath('/migo-logo-transparent.png'), type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <meta name="theme-color" content="#07080B" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700;800&family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href={getAssetPath('/migo-logo-transparent.png')} />
        <link rel="apple-touch-icon" href={getAssetPath('/migo-logo-transparent.png')} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#07080B] text-[#F3F4F6] antialiased selection:bg-brand-orange selection:text-black">
        {children}
      </body>
    </html>
  );
}
