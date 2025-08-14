import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/android-chrome-512x512.png',
    },
  ],
  manifest: '/site.webmanifest',
  title: 'Harry Potter Characters',
  description: 'This app is a part of RSSchool React course',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
