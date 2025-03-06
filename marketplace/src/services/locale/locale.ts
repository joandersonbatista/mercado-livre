'use server';

import { cookies } from 'next/headers';

import { Locale, routing } from '@/i18n/routing';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<string> {
  return (await cookies()).get(COOKIE_NAME)?.value || routing.defaultLocale;
}

export async function setUserLocale(locale: Locale): Promise<void> {
  (await cookies()).set(COOKIE_NAME, locale);
}
