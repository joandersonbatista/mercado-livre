import { Locale } from '@/i18n/routing';

import { LOCALE_CODE_MAP } from './constants';

export function getCurrencyDecimals(currency: string, locale: Locale | string): number {
  locale = typeof locale === 'string' ? locale : LOCALE_CODE_MAP[locale];

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });

  const parts = formatter.formatToParts(1.01);

  const decimalPart = parts.find((part) => part.type === 'fraction');

  return decimalPart ? decimalPart.value.length : 0;
}
