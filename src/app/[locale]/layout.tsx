import '../../index.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// import Flayout from '@components/Flayout';
import Header from '@components/Header/Header';
import { ThemeProvider } from '@providers/themeProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
// import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

import { routing } from '../../i18n/routing';

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

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations('Layout');

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <div
              id="root"
              className="m-0 mx-auto flex h-full min-h-dvh w-full flex-col text-center"
            >
              <div className="dark:bg-background dark:text-foreground bg-background-dark text-foreground-dark h-full w-full flex-grow">
                <div className="flex min-h-screen flex-grow flex-col items-center gap-2.5">
                  <Header
                    mainLink={t('mainLink')}
                    aboutLink={t('aboutLink')}
                    themeLabel={t('themeLabel')}
                  />
                  <main className="flex flex-grow items-center gap-2.5">
                    {children}
                  </main>
                  <section className="sticky bottom-0">
                    {/* TODO: add Flyout */}
                    {/* <Flayout /> */}
                  </section>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
