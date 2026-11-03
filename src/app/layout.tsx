import type { Metadata } from 'next';
import './globals.css';
import { getAssetPath } from '@/utils/asset';

export const metadata: Metadata = {
  metadataBase: new URL('https://nima30019.github.io/migo-studio-v2'),
  title: {
    template: '%s | MIGO Creative Technology Studio V2',
    default: 'MIGO Creative Technology Studio V2 | Virtual Reality, WebAR & 3D Lab',
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
    <html className="dark">
      <head>
        <link rel="icon" href={getAssetPath('/migo-logo-transparent.png')} />
        <link rel="apple-touch-icon" href={getAssetPath('/migo-logo-transparent.png')} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#07080B] text-[#F3F4F6] antialiased selection:bg-brand-orange selection:text-black">
        {children}
      </body>
    </html>
  );
}
