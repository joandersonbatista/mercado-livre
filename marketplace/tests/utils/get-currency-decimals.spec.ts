import { Locale } from '@/i18n/routing';
import { getCurrencyDecimals } from '@/utils/get-currency-decimals';

describe('getCurrencyDecimals', () => {
  it('should return correct decimal places for known currencies', () => {
    const locale: Locale = 'br';

    expect(getCurrencyDecimals('USD', locale)).toBe(2);
    expect(getCurrencyDecimals('EUR', locale)).toBe(2);
    expect(getCurrencyDecimals('JPY', locale)).toBe(0);
    expect(getCurrencyDecimals('BRL', locale)).toBe(2);
  });

  it('should respect locale variations', () => {
    expect(getCurrencyDecimals('USD', 'en-US')).toBe(2);
    expect(getCurrencyDecimals('USD', 'fr-FR')).toBe(2);
    expect(getCurrencyDecimals('JPY', 'ja-JP')).toBe(0);
  });
});
