import { Locale } from '@/i18n/routing';
import { Price } from '@/types/price-type';

import { LOCALE_CODE_MAP } from './constants';

type Currency = {
  formattedValue: string;
  currencyCode: string;
  integer: string;
  decimal: string;
};

const filterPartByType =
  (type: Array<keyof Intl.NumberFormatPartTypeRegistry>) =>
  (part: Intl.NumberFormatPart): boolean => {
    return type.includes(part.type);
  };

export function formatCurrency(price: Price, locale: Locale): Currency {
  const { amount, decimals, currency } = price;

  const formatter = new Intl.NumberFormat(LOCALE_CODE_MAP[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const INVISIBLE_CHARS_REGEX = /\u00A0/g;
  const formattedValue = formatter.format(amount).replace(INVISIBLE_CHARS_REGEX, ' ');
  const parts = formatter.formatToParts(amount);

  const currencyCode = parts.find(filterPartByType(['currency']))?.value || '';
  const decimal = parts.find(filterPartByType(['fraction']))?.value || '00';
  const integer = parts
    .filter(filterPartByType(['integer', 'group']))
    .map(({ value }) => value)
    .join('');

  return {
    formattedValue,
    currencyCode,
    integer,
    decimal,
  };
}
