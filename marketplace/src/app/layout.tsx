import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import { Header } from '@/components';

import styles from './root-layout.module.sass';

import '@/styles/main.sass';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      template: t('template'),
      default: t('default'),
    },
    description: t('description'),
  };
}

export default async function RootLayout({ children }: Readonly<Props>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className={styles['main-content']}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
